import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TodoFilters as TodoFiltersType } from '../types/todo.types';

interface TodoFiltersProps {
  filters: TodoFiltersType;
  categories: string[];
  onFilterChange: (filters: Partial<TodoFiltersType>) => void;
  className?: string;
}

export const TodoFilters = ({
  filters,
  onFilterChange,
  className = '',
}: TodoFiltersProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ search: e.target.value });
  };

  const handlePriorityChange = (value: string) => {
    onFilterChange({ priority: value });
  };



  const handleStatusChange = (value: string) => {
    onFilterChange({ status: value as 'all' | 'completed' | 'pending' });
  };

  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={handleSearchChange}
          className="pl-9 h-9"
          aria-label="Search tasks"
        />
      </div>

      <div className="flex gap-2">
        <Select value={filters.priority} onValueChange={handlePriorityChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
