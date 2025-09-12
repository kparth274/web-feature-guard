import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, AlertTriangle, XCircle, Info, ExternalLink } from "lucide-react";

interface LinterResult {
  feature: string;
  line: number;
  column: number;
  type: 'success' | 'warning' | 'destructive';
  message: string;
  support: {
    chrome: boolean;
    firefox: boolean;
    safari: boolean;
    edge: boolean;
  };
  suggestion?: string;
  polyfill?: string;
  mdn?: string;
}

interface LinterResultsProps {
  results: LinterResult[];
  isLoading: boolean;
  className?: string;
}

export const LinterResults = ({ results, isLoading, className }: LinterResultsProps) => {
  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'destructive':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Info className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-success/20 bg-success/5';
      case 'warning':
        return 'border-warning/20 bg-warning/5';
      case 'destructive':
        return 'border-destructive/20 bg-destructive/5';
      default:
        return 'border-border bg-card';
    }
  };

  const getBrowserIcon = (browser: string, supported: boolean) => {
    const baseClasses = "w-4 h-4 rounded-sm flex items-center justify-center text-xs font-bold";
    const bgClass = supported ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground";
    
    return (
      <div className={cn(baseClasses, bgClass)} title={`${browser}: ${supported ? 'Supported' : 'Not supported'}`}>
        {browser.charAt(0).toUpperCase()}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className={cn("space-y-4", className)}>
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3 w-1/2 mb-2" />
            <Skeleton className="h-3 w-full" />
          </Card>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className={cn("flex flex-col items-center justify-center h-full text-center", className)}>
        <CheckCircle className="h-12 w-12 text-success mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Issues Found</h3>
        <p className="text-muted-foreground">Your code looks good! All features are widely supported.</p>
      </div>
    );
  }

  return (
    <ScrollArea className={cn("h-full", className)}>
      <div className="space-y-4 pr-4">
        {results.map((result, index) => (
          <Card key={index} className={cn("p-4", getStatusColor(result.type))}>
            <div className="flex items-start gap-3">
              {getStatusIcon(result.type)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-sm truncate">{result.feature}</h3>
                  <Badge variant="outline" className="text-xs">
                    Line {result.line}:{result.column}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">
                  {result.message}
                </p>
                
                {/* Browser Support */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium text-muted-foreground">Browser Support:</span>
                  <div className="flex gap-1">
                    {getBrowserIcon('Chrome', result.support.chrome)}
                    {getBrowserIcon('Firefox', result.support.firefox)}
                    {getBrowserIcon('Safari', result.support.safari)}
                    {getBrowserIcon('Edge', result.support.edge)}
                  </div>
                </div>
                
                {/* Suggestions */}
                {result.suggestion && (
                  <div className="bg-card/50 rounded p-3 mb-2">
                    <p className="text-xs font-medium text-foreground mb-1">💡 Suggestion:</p>
                    <p className="text-xs text-muted-foreground">{result.suggestion}</p>
                  </div>
                )}
                
                {/* Links */}
                <div className="flex gap-2 text-xs">
                  {result.polyfill && (
                    <a 
                      href={result.polyfill} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Polyfill
                    </a>
                  )}
                  {result.mdn && (
                    <a 
                      href={result.mdn} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" />
                      MDN Docs
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};