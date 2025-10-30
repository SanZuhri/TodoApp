import { useState, useCallback } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTodos } from './hooks/useTodos';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoFilters } from './components/TodoFilters';
import { TodoStats } from './components/TodoStats';
import { ImportExport } from './components/ImportExport';
import { Todo } from './types/todo.types';

export const TodosPage = () => {
  const { theme, setTheme } = useTheme();
  const [isFormExpanded, setIsFormExpanded] = useState(true);
  
  const {
    todos,
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
  } = useTodos();

  const handleAddTodo = useCallback((text: string, priority: string, category?: string, dueDate?: string) => {
    addTodo(text, priority as any, category, dueDate);
    setIsFormExpanded(false);
  }, [addTodo]);

  const toggleTodo = useCallback((id: string) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      updateTodo(id, { completed: !todo.completed });
    }
  }, [todos, updateTodo]);

  const handleFilterChange = useCallback((newFilters: Partial<typeof filters>) => {
    setFilters({
      ...filters,
      ...newFilters,
    });
  }, [filters, setFilters]);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }} 
        />
      </div>

      {/* Header */}
      <header className="relative border-b border-border/30">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-extralight tracking-tight">Todo</h1>
              <div className="w-16 h-px bg-border/50" />
              <p className="text-sm text-muted-foreground font-mono tracking-wider">
                minimal task manager
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="h-10 w-10 rounded-full hover:bg-muted/50 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-4xl mx-auto px-6 py-12 space-y-10">
        {/* Stats */}
        <TodoStats stats={stats} />

        {/* Todo Form */}
        <div className="space-y-6">
          {isFormExpanded ? (
            <div className="bg-card/30 p-6 rounded-lg border border-border/20">
              <TodoForm
                onSubmit={handleAddTodo}
                categories={categories}
                submitButtonLabel="Add Task"
                submitButtonIcon={<Plus className="h-4 w-4" />}
              />
            </div>
          ) : (
            <Button
              variant="ghost"
              className="w-full h-12 text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-lg border-2 border-dashed border-border/30"
              onClick={() => setIsFormExpanded(true)}
            >
              <Plus className="h-5 w-5 mr-3" />
              Add a new task
            </Button>
          )}
        </div>

        {/* Filters */}
        <TodoFilters
          filters={filters}
          categories={categories}
          onFilterChange={handleFilterChange}
        />

        {/* Import/Export */}
        <ImportExport
          onExport={exportTodos}
          onImport={importTodos}
        />

        {/* Todo List */}
        <TodoList
          todos={todos}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
          onAddSubtask={addSubtask}
          onToggleSubtask={toggleSubtask}
          onDeleteSubtask={deleteSubtask}
        />
      </main>
    </div>
  );
};

export default TodosPage;
