import { TodoStats as TodoStatsType } from '../types/todo.types';

interface TodoStatsProps {
  stats: TodoStatsType;
  className?: string;
}

export const TodoStats = ({ stats, className = '' }: TodoStatsProps) => {
  const { total, completed, pending, progress } = stats;

  if (total === 0) {
    return null;
  }

  return (
    <div className={`relative py-4 ${className}`}>
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border/30 to-transparent hidden sm:block" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center relative bg-card/50 p-4 rounded-lg border border-border/20">
        <div className="space-y-1.5">
          <div className="text-2xl font-mono font-light text-foreground/90">{total}</div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground/80">Total</div>
          <div className="w-8 h-0.5 bg-foreground/10 mx-auto mt-1" />
        </div>
        
        <div className="space-y-1.5">
          <div className="text-2xl font-mono font-light text-foreground/90">
            {completed}
          </div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground/80">Completed</div>
          <div className="w-8 h-0.5 bg-foreground/10 mx-auto mt-1" />
        </div>

        <div className="space-y-1.5">
          <div className="text-2xl font-mono font-light text-foreground/90">
            {pending}
          </div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground/80">Pending</div>
          <div className="w-8 h-0.5 bg-foreground/10 mx-auto mt-1" />
        </div>

        <div className="space-y-1.5">
          <div className="text-2xl font-mono font-light text-foreground/90">
            {progress}%
          </div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground/80">Progress</div>
          <div className="w-8 h-0.5 bg-foreground/10 mx-auto mt-1" />
        </div>
        
        {/* Progress bar */}
        <div className="col-span-2 sm:col-span-4 mt-4">
          <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-foreground/60 transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              role="progressbar"
            />
          </div>
          <div className="text-xs text-muted-foreground mt-2 font-mono transition-colors">
            {completed} of {total} tasks completed
          </div>
        </div>
      </div>
    </div>
  );
};
