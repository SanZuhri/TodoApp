import { useState, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Todo, Subtask, TodoFilters, TodoStats } from '../types/todo.types';

const STORAGE_KEY = 'todos';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [filters, setFilters] = useState<TodoFilters>({
    search: '',
    priority: 'all',
    category: 'all',
    status: 'all',
  });

  // Save to localStorage whenever todos change
  const saveToLocalStorage = useCallback((updatedTodos: Todo[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
    }
  }, []);

  // CRUD Operations
  const addTodo = useCallback((text: string, priority: Todo['priority'], category?: string, dueDate?: string) => {
    const now = new Date().toISOString();
    const newTodo: Todo = {
      id: uuidv4(),
      text: text.trim(),
      completed: false,
      priority,
      category: category?.trim() || undefined,
      dueDate,
      subtasks: [],
      createdAt: now,
      updatedAt: now,
    };
    
    setTodos(prevTodos => {
      const updatedTodos = [...prevTodos, newTodo];
      saveToLocalStorage(updatedTodos);
      return updatedTodos;
    });
  }, [saveToLocalStorage]);

  const updateTodo = useCallback((id: string, updates: Partial<Todo>) => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.map(todo => 
        todo.id === id 
          ? { ...todo, ...updates, updatedAt: new Date().toISOString() } 
          : todo
      );
      saveToLocalStorage(updatedTodos);
      return updatedTodos;
    });
  }, [saveToLocalStorage]);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.filter(todo => todo.id !== id);
      saveToLocalStorage(updatedTodos);
      return updatedTodos;
    });
  }, [saveToLocalStorage]);

  // Subtask operations
  const addSubtask = useCallback((todoId: string, text: string) => {
    if (!text.trim()) return;
    
    const now = new Date().toISOString();
    const newSubtask: Subtask = {
      id: uuidv4(),
      text: text.trim(),
      completed: false,
      createdAt: now,
      updatedAt: now,
    };
    
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.map(todo => 
        todo.id === todoId
          ? { 
              ...todo, 
              subtasks: [...(todo.subtasks || []), newSubtask],
              updatedAt: now,
            } 
          : todo
      );
      saveToLocalStorage(updatedTodos);
      return updatedTodos;
    });
  }, [saveToLocalStorage]);

  const toggleSubtask = useCallback((todoId: string, subtaskId: string) => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.map(todo => {
        if (todo.id !== todoId) return todo;
        
        const updatedSubtasks = (todo.subtasks || []).map(subtask => 
          subtask.id === subtaskId 
            ? { ...subtask, completed: !subtask.completed, updatedAt: new Date().toISOString() } 
            : subtask
        );
        
        return {
          ...todo,
          subtasks: updatedSubtasks,
          updatedAt: new Date().toISOString(),
        };
      });
      
      saveToLocalStorage(updatedTodos);
      return updatedTodos;
    });
  }, [saveToLocalStorage]);

  const deleteSubtask = useCallback((todoId: string, subtaskId: string) => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.map(todo => {
        if (todo.id !== todoId) return todo;
        
        return {
          ...todo,
          subtasks: (todo.subtasks || []).filter(sub => sub.id !== subtaskId),
          updatedAt: new Date().toISOString(),
        };
      });
      
      saveToLocalStorage(updatedTodos);
      return updatedTodos;
    });
  }, [saveToLocalStorage]);

  // Filtering and stats
  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesSearch = todo.text.toLowerCase().includes(filters.search.toLowerCase()) ||
                         (todo.category?.toLowerCase().includes(filters.search.toLowerCase()) ?? false);
      
      const matchesPriority = filters.priority === 'all' || todo.priority === filters.priority;
      const matchesCategory = filters.category === 'all' || todo.category === filters.category;
      
      const matchesStatus = 
        filters.status === 'all' || 
        (filters.status === 'completed' && todo.completed) ||
        (filters.status === 'pending' && !todo.completed);
      
      return matchesSearch && matchesPriority && matchesCategory && matchesStatus;
    });
  }, [todos, filters]);

  const stats = useMemo((): TodoStats => {
    const completed = todos.filter(t => t.completed).length;
    const total = todos.length;
    
    return {
      total,
      completed,
      pending: total - completed,
      progress: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }, [todos]);

  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    todos.forEach(todo => {
      if (todo.category) {
        categorySet.add(todo.category);
      }
    });
    return Array.from(categorySet).sort();
  }, [todos]);

  // Import/Export
  const exportTodos = useCallback(() => {
    const dataStr = JSON.stringify(todos, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const link = document.createElement('a');
    link.setAttribute('href', dataUri);
    link.setAttribute('download', 'todos.json');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [todos]);

  const importTodos = useCallback((jsonString: string) => {
    try {
      const importedTodos = JSON.parse(jsonString);
      if (Array.isArray(importedTodos)) {
        setTodos(importedTodos);
        saveToLocalStorage(importedTodos);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error importing todos:', error);
      return false;
    }
  }, [saveToLocalStorage]);

  return {
    todos: filteredTodos,
    stats,
    categories,
    filters,
    setFilters,
    addTodo,
    updateTodo,
    deleteTodo,
    addSubtask,
    toggleSubtask,
    deleteSubtask,
    exportTodos,
    importTodos,
  };
};
