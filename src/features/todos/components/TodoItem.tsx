import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Trash2, Edit } from 'lucide-react';
import { Todo } from '../types/todo.types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onAddSubtask?: (todoId: string, text: string) => void;
  onToggleSubtask?: (todoId: string, subtaskId: string) => void;
  onDeleteSubtask?: (todoId: string, subtaskId: string) => void;
  className?: string;
}

export const TodoItem = React.memo(({
  todo,
  onToggle,
  onDelete,
  onEdit,
  className = '',
}: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);



  return (
    <div
      className={`group flex items-center gap-3 p-3 border-b border-border/30 hover:bg-muted/20 transition-all duration-200 ease-in-out touch-manipulation ${className}`}
      data-testid={`todo-item-${todo.id}`}
    >
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
        className="h-5 w-5"
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
      />

      <span
        className={`flex-1 text-sm ${
          todo.completed
            ? 'line-through text-muted-foreground'
            : 'text-foreground'
        }`}
      >
        {todo.text}
      </span>

      <span className={`text-xs px-2 py-1 rounded border transition-colors duration-200 ${
        todo.priority === 'high' ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-950' :
        todo.priority === 'medium' ? 'border-yellow-300 bg-yellow-50 dark:border-yellow-700 dark:bg-yellow-950' :
        'border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-950'
      }`}>
        {todo.priority}
      </span>

      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setEditText(todo.text);
                setIsEditing(true);
              }}
              className="h-8 w-8"
              aria-label="Edit task"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                placeholder="Task description"
                autoFocus
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (editText.trim() && editText.trim() !== todo.text) {
                    onEdit?.(todo.id, editText.trim());
                  }
                  setIsEditing(false);
                }}
                disabled={!editText.trim()}
              >
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              aria-label={`Delete task: ${todo.text}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Task</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete "{todo.text}"? This action cannot be undone.
            </p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  onDelete(todo.id);
                  setShowDeleteDialog(false);
                }}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
});

export const TodoItemSkeleton = React.memo(() => (
  <div className="flex items-center gap-3 p-3 border-b border-border/30">
    <Skeleton className="h-5 w-5 rounded" />
    <Skeleton className="flex-1 h-4" />
    <Skeleton className="h-5 w-12 rounded" />
    <div className="flex gap-1">
      <Skeleton className="h-8 w-8 rounded" />
      <Skeleton className="h-8 w-8 rounded" />
    </div>
  </div>
));
