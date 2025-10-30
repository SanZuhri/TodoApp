export type Priority = 'low' | 'medium' | 'high';

export interface Subtask {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category?: string;
  priority: Priority;
  dueDate?: string;
  subtasks?: Subtask[];
  createdAt: string;
  updatedAt: string;
}

export interface TodoFilters {
  search: string;
  priority: string;
  category: string;
  status: 'all' | 'completed' | 'pending';
}

export interface TodoStats {
  total: number;
  completed: number;
  pending: number;
  progress: number;
}
