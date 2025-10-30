import { useRef, ChangeEvent } from 'react';

interface ImportExportProps {
  onExport: () => void;
  onImport: (jsonString: string) => boolean;
  className?: string;
}

export const ImportExport = ({ onExport, onImport, className = '' }: ImportExportProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const success = onImport(content);

        if (!success) {
          throw new Error('Invalid file format');
        }
      } catch (error) {
        console.error('Import failed:', error);
        alert('Import failed. Please check the file format.');
      }
    };

    reader.readAsText(file);

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <input
      type="file"
      ref={fileInputRef}
      onChange={handleImport}
      accept=".json"
      className="hidden"
      id="import-todos"
    />
  );
};

export default ImportExport;