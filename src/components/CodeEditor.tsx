import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: 'javascript' | 'css' | 'html';
  className?: string;
}

export const CodeEditor = ({ value, onChange, language, className }: CodeEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);
      
      // Reset cursor position
      setTimeout(() => {
        textarea.setSelectionRange(start + 2, start + 2);
      }, 0);
    }
  };

  return (
    <div className={cn("relative bg-gradient-code rounded-lg border border-border overflow-hidden", className)}>
      <div className="absolute top-0 left-0 right-0 bg-card/80 border-b border-border px-4 py-2 text-xs font-mono text-muted-foreground">
        {language}
      </div>
      
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full min-h-[400px] p-4 pt-12 pl-14 bg-transparent text-foreground font-mono text-sm resize-none outline-none border-none"
        placeholder={`Enter your ${language} code here...`}
        spellCheck={false}
      />
      
      {/* Line numbers */}
      <div className="absolute top-12 left-0 w-12 h-full bg-card/20 border-r border-border text-center text-xs font-mono text-muted-foreground py-4 leading-5 select-none pointer-events-none">
        {value.split('\n').map((_, index) => (
          <div key={index + 1}>{index + 1}</div>
        ))}
      </div>
    </div>
  );
};