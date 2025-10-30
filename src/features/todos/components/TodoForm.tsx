import { useState, FormEvent, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Priority } from '../types/todo.types';

interface TodoFormProps {
  onSubmit: (text: string, priority: Priority, category?: string, dueDate?: string) => void;
  initialText?: string;
  initialPriority?: Priority;
  initialCategory?: string;
  initialDueDate?: string;
  categories: string[];
  className?: string;
  autoFocus?: boolean;
  showCategory?: boolean;
  showDueDate?: boolean;
  submitButtonLabel?: string;
  submitButtonIcon?: React.ReactNode;
}

export const TodoForm = ({
  onSubmit,
  initialText = '',
  initialPriority = 'medium',
  initialCategory = '',
  initialDueDate = '',
  categories = [],
  className = '',
  autoFocus = true,
  showCategory = true,
  showDueDate = true,
  submitButtonLabel = 'Add',
  submitButtonIcon = <Plus className="h-4 w-4" />,
}: TodoFormProps) => {
  const [text, setText] = useState(initialText);
  const [priority, setPriority] = useState<Priority>(initialPriority as Priority);
  const [category, setCategory] = useState(initialCategory || 'no-category');
  const [dueDate, setDueDate] = useState(initialDueDate);
  const [isCategoryInput, setIsCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  // Reset form when initial values change (for edit mode)
  useEffect(() => {
    setText(initialText);
    setPriority(initialPriority as Priority);
    setCategory(initialCategory);
    setDueDate(initialDueDate);
  }, [initialText, initialPriority, initialCategory, initialDueDate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedText = text.trim();
    const trimmedCategory = category === 'no-category' ? '' : category?.trim();
    
    if (!trimmedText) return;
    
    onSubmit(
      trimmedText, 
      priority, 
      trimmedCategory || undefined, 
      dueDate || undefined
    );
    
    // Reset form
    setText('');
    setPriority('medium');
    setCategory('no-category');
    setDueDate('');
    setNewCategory('');
    setIsCategoryInput(false);
  };

  const handleAddCategory = (e: React.MouseEvent) => {
    e.preventDefault();
    const trimmedCategory = newCategory.trim();
    if (trimmedCategory && !categories.includes(trimmedCategory)) {
      setCategory(trimmedCategory);
      setNewCategory('');
    }
    setIsCategoryInput(false);
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="flex gap-2 items-start">
        <div className="flex-1 space-y-3">
          <Input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What needs to be done?"
            className="text-base px-3 py-2 h-auto min-h-[40px]"
            autoFocus={autoFocus}
            aria-label="Task description"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {showCategory && (
              <div className="relative">
                {isCategoryInput ? (
                  <div className="flex gap-1">
                    <Input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="New category"
                      className="text-sm h-9 px-2"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddCategory(e as any);
                        } else if (e.key === 'Escape') {
                          setIsCategoryInput(false);
                          setNewCategory('');
                        }
                      }}
                    />
                    <Button 
                      type="button" 
                      size="sm" 
                      variant="outline" 
                      className="h-9 px-2"
                      onClick={handleAddCategory}
                      disabled={!newCategory.trim()}
                    >
                      Add
                    </Button>
                  </div>
                ) : (
                  <Select 
                    value={category} 
                    onValueChange={(value) => {
                      if (value === 'add-new') {
                        setIsCategoryInput(true);
                      } else {
                        setCategory(value);
                      }
                    }}
                  >
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no-category">No category</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase mt-3 mb-2">
                          <span className="bg-background px-2 text-muted-foreground">
                            Actions
                          </span>
                        </div>
                      </div>
                      <SelectItem value="add-new" className="font-medium">
                        + Add new category
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            )}
            
            <Select 
              value={priority} 
              onValueChange={(value: string) => setPriority(value as Priority)}
            >
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
              </SelectContent>
            </Select>
            
            {showDueDate && (
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="h-9 text-sm font-mono"
              />
            )}
          </div>
        </div>
        
        <Button 
          type="submit" 
          size="icon" 
          className="h-10 w-10 p-0 rounded-full hover:scale-105 transition-transform flex-shrink-0"
          disabled={!text.trim()}
          aria-label={submitButtonLabel}
        >
          {submitButtonIcon}
        </Button>
      </div>
    </form>
  );
};
