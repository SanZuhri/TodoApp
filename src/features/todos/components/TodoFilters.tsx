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
  categories = [],
  onFilterChange,
  className = '',
}: TodoFiltersProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ search: e.target.value });
  };

  const handlePriorityChange = (value: string) => {
    onFilterChange({ priority: value });
  };

  const handleCategoryChange = (value: string) => {
    onFilterChange({ category: value });
  };

  const handleStatusChange = (value: string) => {
    onFilterChange({ status: value as 'all' | 'completed' | 'pending' });
  };

  return (
    <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-4 bg-card/50 rounded-lg border border-border/20 transition-all duration-300 ${className}`}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={handleSearchChange}
          className="pl-9 h-9 text-sm"
          aria-label="Search tasks"
        />
      </div>
      
      <div className="grid grid-cols-2 sm:flex gap-2">
        <Select value={filters.priority} onValueChange={handlePriorityChange}>
          <SelectTrigger className="h-9 text-sm min-w-[120px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={filters.category} onValueChange={handleCategoryChange}>
          <SelectTrigger className="h-9 text-sm min-w-[120px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={filters.status} onValueChange={handleStatusChange}>
          <SelectTrigger className="h-9 text-sm min-w-[120px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
