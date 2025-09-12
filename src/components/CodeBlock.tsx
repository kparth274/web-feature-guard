import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  highlights?: Array<{
    line: number;
    type: 'success' | 'warning' | 'destructive';
    message: string;
  }>;
  className?: string;
}

export const CodeBlock = ({ code, language = "javascript", highlights = [], className }: CodeBlockProps) => {
  const lines = code.split('\n');

  const getHighlightColor = (type: 'success' | 'warning' | 'destructive') => {
    switch (type) {
      case 'success':
        return 'border-l-success bg-success/5';
      case 'warning':
        return 'border-l-warning bg-warning/5';
      case 'destructive':
        return 'border-l-destructive bg-destructive/5';
      default:
        return '';
    }
  };

  const getHighlightIcon = (type: 'success' | 'warning' | 'destructive') => {
    switch (type) {
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'destructive':
        return '❌';
      default:
        return '';
    }
  };

  return (
    <div className={cn("relative rounded-lg bg-gradient-code shadow-code border border-border overflow-hidden", className)}>
      <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-r from-card to-card/80 border-b border-border flex items-center px-4">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive"></div>
          <div className="w-3 h-3 rounded-full bg-warning"></div>
          <div className="w-3 h-3 rounded-full bg-success"></div>
        </div>
        <span className="ml-4 text-sm text-muted-foreground font-mono">{language}</span>
      </div>
      <div className="pt-10 p-4 font-mono text-sm overflow-x-auto">
        {lines.map((line, index) => {
          const highlight = highlights.find(h => h.line === index + 1);
          const lineNumber = index + 1;
          
          return (
            <div key={index} className="relative group">
              <div className={cn(
                "flex items-start gap-4 py-1 rounded transition-colors",
                highlight && getHighlightColor(highlight.type)
              )}>
                <span className="text-muted-foreground text-xs w-8 text-right select-none">
                  {lineNumber}
                </span>
                <code className="text-foreground flex-1 whitespace-pre">
                  {line || ' '}
                </code>
                {highlight && (
                  <span className="text-lg leading-none">
                    {getHighlightIcon(highlight.type)}
                  </span>
                )}
              </div>
              {highlight && (
                <div className="absolute left-12 top-full z-10 hidden group-hover:block">
                  <div className="mt-1 p-2 bg-popover text-popover-foreground text-xs rounded border shadow-lg whitespace-nowrap">
                    {highlight.message}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};