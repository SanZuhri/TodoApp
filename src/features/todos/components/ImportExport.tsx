import { useState, useRef, ChangeEvent } from 'react';
import { Download, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface ImportExportProps {
  onExport: () => void;
  onImport: (jsonString: string) => boolean;
  className?: string;
}

export const ImportExport = ({ onExport, onImport, className = '' }: ImportExportProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    try {
      onExport();
      toast({
        title: 'Export successful',
        description: 'Your todos have been exported successfully.',
      });
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: 'Export failed',
        description: 'There was an error exporting your todos.',
        variant: 'destructive',
      });
    }
  };

  const handleImport = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const success = onImport(content);
        
        if (success) {
          toast({
            title: 'Import successful',
            description: 'Your todos have been imported successfully.',
          });
        } else {
          throw new Error('Invalid file format');
        }
      } catch (error) {
        console.error('Import failed:', error);
        toast({
          title: 'Import failed',
          description: 'The file is not a valid todos export.',
          variant: 'destructive',
        });
      }
    };
    
    reader.onerror = () => {
      toast({
        title: 'Import failed',
        description: 'There was an error reading the file.',
        variant: 'destructive',
      });
    };
    
    reader.readAsText(file);
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`flex flex-wrap gap-3 justify-center transition-all duration-300 ${className}`}>
      <Button 
        onClick={handleExport}
        variant="outline"
        size="sm"
        className="h-9 px-4 text-sm rounded-full hover:bg-muted/30 transition-colors border-border/40"
      >
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>
      
      <div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImport}
          accept=".json"
          className="hidden"
          id="import-todos"
        />
        <Button 
          variant="outline"
          size="sm"
          className="h-9 px-4 text-sm rounded-full hover:bg-muted/30 transition-colors border-border/40"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-4 w-4 mr-2" />
          Import
        </Button>
      </div>
    </div>
  );
};
