import { useState } from "react";
import { toast } from "@/hooks/use-toast";

/**
 * Custom hook for copying text to clipboard
 */
export function useCopyToClipboard(): {
  copiedText: string | null;
  copy: (text: string) => Promise<boolean>;
} {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copy = async (text: string): Promise<boolean> => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      toast({
        title: "Error",
        description: "Clipboard not supported in this browser",
        variant: "destructive",
      });
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard",
      });
      return true;
    } catch (error) {
      console.error("Failed to copy:", error);
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
      setCopiedText(null);
      return false;
    }
  };

  return { copiedText, copy };
}
