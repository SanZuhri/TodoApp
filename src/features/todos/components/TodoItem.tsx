import { useState } from 'react';
import { format } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Trash2, Plus, ChevronDown, Edit } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Todo, Subtask } from '../types/todo.types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onAddSubtask: (todoId: string, text: string) => void;
  onToggleSubtask: (todoId: string, subtaskId: string) => void;
  onDeleteSubtask: (todoId: string, subtaskId: string) => void;
  className?: string;
}

export const TodoItem = ({
  todo,
  onToggle,
  onDelete,
  onAddSubtask,
  onToggleSubtask,
  onDeleteSubtask,
  className = '',
}: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [subtaskText, setSubtaskText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleAddSubtask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subtaskText.trim()) return;
    
    onAddSubtask(todo.id, subtaskText);
    setSubtaskText('');
    setIsExpanded(true);
  };

  const completedSubtasks = todo.subtasks?.filter(s => s.completed).length || 0;
  const totalSubtasks = todo.subtasks?.length || 0;
  const hasSubtasks = totalSubtasks > 0;
  const allSubtasksCompleted = hasSubtasks && completedSubtasks === totalSubtasks;

  return (
    <div
      className={`group relative p-4 bg-card/70 hover:bg-card/90 rounded-lg border border-border/30 transition-all duration-300 ease-in-out hover:shadow-sm ${className}`}
      data-testid={`todo-item-${todo.id}`}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => onToggle(todo.id)}
          className={`mt-0.5 h-5 w-5 rounded-full border-2 ${
            todo.completed 
              ? 'border-primary bg-primary' 
              : 'border-foreground/30 hover:border-foreground/50'
          }`}
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        />
        
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div className="flex-1">
              <h3 
                className={`text-base leading-snug break-words ${
                  todo.completed
                    ? 'line-through text-muted-foreground/80'
                    : 'text-foreground'
                }`}
              >
                {todo.text}
              </h3>
              
              {todo.dueDate && (
                <div className="mt-1 text-xs text-muted-foreground">
                  <span className="px-1.5 py-0.5 rounded bg-muted/30">
                    📅 {format(new Date(todo.dueDate), 'MMM d, yyyy')}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-1.5">
              {todo.priority && (
                <span className="text-xs px-2 py-1 rounded-full border border-border/30 bg-muted/50 font-medium">
                  {todo.priority}
                </span>
              )}
              
              {todo.category && (
                <span className="text-xs px-2 py-1 rounded-full border border-border/30 bg-muted/50">
                  {todo.category}
                </span>
              )}
            </div>
          </div>
          
          {hasSubtasks && (
            <div className="mt-2">
              <Collapsible 
                open={isExpanded} 
                onOpenChange={setIsExpanded}
                className="space-y-2"
              >
                 <CollapsibleTrigger asChild>
                   <Button
                     variant="ghost"
                     size="sm"
                     className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground transition-colors -ml-1.5 w-full justify-start"
                   >
                     <span className="font-medium">
                       {completedSubtasks} of {totalSubtasks} subtasks
                     </span>
                     <ChevronDown
                       className={`h-3.5 w-3.5 ml-auto transition-transform duration-200 ${
                         isExpanded ? 'rotate-180' : ''
                       }`}
                     />
                   </Button>
                 </CollapsibleTrigger>
                
                <CollapsibleContent className="space-y-2 pl-2 border-l-2 border-muted-foreground/20">
                  <div className="space-y-2">
                    {todo.subtasks?.map((subtask) => (
                      <div 
                        key={subtask.id} 
                        className="flex items-center gap-2 group/subtask"
                      >
                        <Checkbox
                          id={`subtask-${subtask.id}`}
                          checked={subtask.completed}
                          onCheckedChange={() => onToggleSubtask(todo.id, subtask.id)}
                          className="h-4 w-4 rounded border-foreground/30 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                        />
                        <label 
                          htmlFor={`subtask-${subtask.id}`}
                          className={`flex-1 text-sm cursor-pointer ${
                            subtask.completed 
                              ? 'line-through text-muted-foreground' 
                              : 'text-foreground/90'
                          }`}
                        >
                          {subtask.text}
                        </label>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDeleteSubtask(todo.id, subtask.id)}
                          className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive opacity-0 group-hover/subtask:opacity-100 transition-opacity"
                          aria-label={`Delete subtask: ${subtask.text}`}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                   <form onSubmit={handleAddSubtask} className="flex gap-2 mt-3">
                     <Input
                       type="text"
                       value={subtaskText}
                       onChange={(e) => setSubtaskText(e.target.value)}
                       placeholder="Add a subtask..."
                       className="flex-1 h-8 text-sm"
                     />
                     <Button
                       type="submit"
                       variant="outline"
                       size="sm"
                       className="h-8 px-3"
                       disabled={!subtaskText.trim()}
                     >
                       <Plus className="h-3.5 w-3.5" />
                     </Button>
                   </form>
                </CollapsibleContent>
              </Collapsible>
            </div>
          )}
        </div>
        
        <div className="flex flex-row sm:flex-col gap-1.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-7 w-7 p-0 rounded-full hover:bg-muted/50"
            aria-label="Toggle subtasks"
          >
            <Plus className={`h-3.5 w-3.5 transition-transform ${isExpanded ? 'rotate-45' : ''}`} />
          </Button>

          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setEditText(todo.text);
                  setIsEditing(true);
                }}
                className="h-7 w-7 p-0 rounded-full text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Edit task"
              >
                <Edit className="h-3.5 w-3.5" />
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
                      // For now, we'll need to pass an onEdit prop from parent
                      alert('Edit functionality will be implemented soon!');
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
                className="h-7 w-7 p-0 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                aria-label={`Delete task: ${todo.text}`}
              >
                <Trash2 className="h-3.5 w-3.5" />
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
    </div>
  );
};
