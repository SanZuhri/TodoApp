import { useState, useCallback, useRef } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, Plus, Settings, Download, Upload, Info } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useTodos } from './hooks/useTodos';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoFilters } from './components/TodoFilters';
import { TodoStats } from './components/TodoStats';
import { Todo } from './types/todo.types';

export const TodosPage = () => {
  const { theme, setTheme } = useTheme();
  const [showAbout, setShowAbout] = useState(false);
  const [isFormExpanded, setIsFormExpanded] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
    isImporting,
    addCategory,
  } = useTodos();

  const handleAddTodo = useCallback((text: string, priority: string, category?: string, dueDate?: string) => {
    addTodo(text, priority as Todo['priority'], category, dueDate);
    setIsFormExpanded(false);
  }, [addTodo]);

  const toggleTodo = useCallback((id: string) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      updateTodo(id, { completed: !todo.completed });
    }
  }, [todos, updateTodo]);

  const handleEditTodo = useCallback((id: string, text: string) => {
    updateTodo(id, { text });
  }, [updateTodo]);

  const handleFilterChange = useCallback((newFilters: Partial<typeof filters>) => {
    setFilters({
      ...filters,
      ...newFilters,
    });
  }, [filters, setFilters]);

  const handleImport = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleFileImport = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target?.result as string;
      await importTodos(content);
    };
    reader.readAsText(file);

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [importTodos]);

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full hover:bg-muted/50 transition-colors"
                  aria-label="Settings"
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                  {theme === 'dark' ? (
                    <>
                      <Sun className="h-4 w-4 mr-2" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4 mr-2" />
                      Dark Mode
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowAbout(true)}>
                  <Info className="h-4 w-4 mr-2" />
                  About
                </DropdownMenuItem>
                <DropdownMenuItem onClick={exportTodos}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Todos
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleImport}>
                  <Upload className="h-4 w-4 mr-2" />
                  Import Todos
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-10">
        {/* Stats */}
        <TodoStats stats={stats} />

        {/* Todo Form */}
        <div className="space-y-6">
          {isFormExpanded ? (
            <div className="bg-card/30 p-6 rounded-lg border border-border/20">
              <TodoForm
                onSubmit={(text, priority) => handleAddTodo(text, priority)}
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

        {/* Todo List */}
        <TodoList
          todos={todos}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
          onEditTodo={handleEditTodo}
          isLoading={isImporting}
        />
      </main>

      {/* About Dialog */}
      <Dialog open={showAbout} onOpenChange={setShowAbout}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>About Minimal To-Do</DialogTitle>
            <DialogDescription>
              A clean, monochrome task management app built with React, TypeScript, and Tailwind CSS.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>Features:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Simple task management with priorities</li>
                <li>Search and filter functionality</li>
                <li>Progress tracking</li>
                <li>Data export/import</li>
                <li>Dark/Light mode</li>
              </ul>
            </div>
            <div className="text-sm text-muted-foreground">
              <p><strong>Tech Stack:</strong></p>
              <p className="font-mono text-xs mt-1">
                React • TypeScript • Vite • Tailwind CSS • shadcn/ui
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Hidden file input for import */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileImport}
        accept=".json"
        className="hidden"
      />
    </div>
  );
};

export default TodosPage;
