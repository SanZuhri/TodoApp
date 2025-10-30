import { useState, FormEvent, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Priority } from '../types/todo.types';

interface TodoFormProps {
  onSubmit: (text: string, priority: Priority) => void;
  initialText?: string;
  initialPriority?: Priority;
  className?: string;
  autoFocus?: boolean;
  submitButtonLabel?: string;
  submitButtonIcon?: React.ReactNode;
}

export const TodoForm = ({
  onSubmit,
  initialText = '',
  initialPriority = 'medium',
  className = '',
  autoFocus = true,
  submitButtonLabel = 'Add',
  submitButtonIcon = <Plus className="h-4 w-4" />,
}: TodoFormProps) => {
  const [text, setText] = useState(initialText);
  const [priority, setPriority] = useState<Priority>(initialPriority as Priority);

  // Reset form when initial values change (for edit mode)
  useEffect(() => {
    setText(initialText);
    setPriority(initialPriority as Priority);
  }, [initialText, initialPriority]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedText = text.trim();

    if (!trimmedText) return;

    onSubmit(trimmedText, priority);

    // Reset form
    setText('');
    setPriority('medium');
  };



  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="flex gap-3">
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1"
          autoFocus={autoFocus}
          aria-label="Task description"
        />

        <Select
          value={priority}
          onValueChange={(value: string) => setPriority(value as Priority)}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>

        <Button
          type="submit"
          className="px-6"
          disabled={!text.trim()}
          aria-label={submitButtonLabel}
        >
          {submitButtonIcon}
          <span className="ml-2">{submitButtonLabel}</span>
        </Button>
      </div>
    </form>
  );
};
