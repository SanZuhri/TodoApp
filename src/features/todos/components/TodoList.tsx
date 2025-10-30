import React, { useCallback, useState } from 'react';
import { Todo } from '../types/todo.types';
import { TodoItem, TodoItemSkeleton } from './TodoItem';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onEditTodo?: (id: string, text: string) => void;
  emptyState?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  itemsPerPage?: number;
}

export const TodoList = React.memo(({
  todos,
  onToggleTodo,
  onDeleteTodo,
  onEditTodo,
  emptyState,
  className = '',
  isLoading = false,
  itemsPerPage = 20,
}: TodoListProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(todos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTodos = todos.slice(startIndex, endIndex);

  const handleKeyDown = useCallback((event: React.KeyboardEvent, todoId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onToggleTodo(todoId);
    } else if (event.key === 'Delete' || event.key === 'Backspace') {
      event.preventDefault();
      onDeleteTodo(todoId);
    }
  }, [onToggleTodo, onDeleteTodo]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);
  if (todos.length === 0) {
    return emptyState ? (
      <div className={`py-12 ${className}`}>
        {emptyState}
      </div>
    ) : (
      <div className={`text-center py-12 ${className}`}>
        <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-dashed border-border/30 flex items-center justify-center text-muted-foreground/40">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <line x1="10" y1="9" x2="8" y2="9" />
          </svg>
        </div>
        <p className="text-muted-foreground">No tasks found. Add one above.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: 5 }).map((_, index) => (
          <TodoItemSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="space-y-2 sm:space-y-1" role="list" aria-label="Todo list">
        {currentTodos.map((todo) => (
          <div
            key={todo.id}
            role="listitem"
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, todo.id)}
            aria-label={`Todo: ${todo.text}, priority: ${todo.priority}, ${todo.completed ? 'completed' : 'pending'}`}
          >
            <TodoItem
              todo={todo}
              onToggle={onToggleTodo}
              onDelete={onDeleteTodo}
              onEdit={onEditTodo}
            />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-border/30">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(endIndex, todos.length)} of {todos.length} todos
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
});
