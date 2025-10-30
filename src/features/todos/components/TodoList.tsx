import { Todo } from '../types/todo.types';
import { TodoItem } from './TodoItem';

export interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onAddSubtask: (todoId: string, text: string) => void;
  onToggleSubtask: (todoId: string, subtaskId: string) => void;
  onDeleteSubtask: (todoId: string, subtaskId: string) => void;
  emptyState?: React.ReactNode;
  className?: string;
}

export const TodoList = ({
  todos,
  onToggleTodo,
  onDeleteTodo,
  onAddSubtask,
  onToggleSubtask,
  onDeleteSubtask,
  emptyState,
  className = '',
}: TodoListProps) => {
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

  return (
    <div className={`space-y-2 ${className}`}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggleTodo}
          onDelete={onDeleteTodo}
          onAddSubtask={onAddSubtask}
          onToggleSubtask={onToggleSubtask}
          onDeleteSubtask={onDeleteSubtask}
        />
      ))}
    </div>
  );
};
