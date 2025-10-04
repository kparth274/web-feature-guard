import { useState, useEffect } from "react";
import { CodeEditor } from "@/components/CodeEditor";
import { LinterResults } from "@/components/LinterResults";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { lintCode } from "@/lib/linter-engine";
import { findFeatureId } from "@/lib/feature-id-finder";
import { ArrowLeft, Play, FileText, Code, Palette } from "lucide-react";
import { Link } from "react-router-dom";

const defaultCode = {
  javascript: `// Modern JavaScript features
const data = await fetch('/api/data');
const items = [1, 2, 3].flatMap(x => [x, x * 2]);

// Web API usage
navigator.share({
  title: 'My App',
  url: window.location.href
});

// Modern CSS-in-JS
document.body.style.scrollBehavior = 'smooth';
document.body.style.backdropFilter = 'blur(10px)';`,
  
  css: `/* Modern CSS features */
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  
  /* Modern properties */
  backdrop-filter: blur(10px);
  scroll-behavior: smooth;
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    font-size: 1.2rem;
  }
}

.gradient-text {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}`,
  
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Modern Web App</title>
</head>
<body>
  <!-- Modern HTML features -->
  <dialog id="modal">
    <form method="dialog">
      <input type="color" name="theme">
      <input type="date" name="deadline">
      <button type="submit">Close</button>
    </form>
  </dialog>
  
  <script>
    // Modern features
    const modal = document.querySelector('dialog');
    modal.showModal();
  </script>
</body>
</html>`
};

const Linter = () => {
  const [activeTab, setActiveTab] = useState<'javascript' | 'css' | 'html'>('javascript');
  const [code, setCode] = useState(defaultCode[activeTab]);
  const [results, setResults] = useState<any[]>([]);
  const [isLinting, setIsLinting] = useState(false);

  useEffect(() => {
    // Log available features for debugging (dev only)
    if (process.env.NODE_ENV === 'development') {
      console.log('Testing feature detection:');
      console.log('clipboard features:', findFeatureId('clipboard'));
      console.log('at features:', findFeatureId('at'));
      console.log('clone features:', findFeatureId('clone'));
    }
  }, []);

  useEffect(() => {
    setCode(defaultCode[activeTab]);
  }, [activeTab]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleLint();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [code, activeTab]);

  const handleLint = async () => {
    setIsLinting(true);
    try {
      const lintResults = await lintCode(code, activeTab);
      setResults(lintResults);
    } catch (error) {
      console.error('Linting error:', error);
    } finally {
      setIsLinting(false);
    }
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'javascript': return <Code className="h-4 w-4" />;
      case 'css': return <Palette className="h-4 w-4" />;
      case 'html': return <FileText className="h-4 w-4" />;
      default: return <Code className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold">Baseline Auto-Linter</h1>
              <p className="text-sm text-muted-foreground">Real-time compatibility checking</p>
            </div>
          </div>
          <Badge variant="secondary" className="px-3 py-1">
            Live Demo
          </Badge>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8 h-[calc(100vh-12rem)]">
          {/* Code Editor Panel */}
          <Card className="p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Code Input</h2>
              <Button 
                onClick={handleLint} 
                disabled={isLinting}
                variant="outline" 
                size="sm"
              >
                <Play className="h-4 w-4 mr-2" />
                {isLinting ? 'Linting...' : 'Lint Code'}
              </Button>
            </div>
            
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="javascript" className="flex items-center gap-2">
                  {getTabIcon('javascript')}
                  JavaScript
                </TabsTrigger>
                <TabsTrigger value="css" className="flex items-center gap-2">
                  {getTabIcon('css')}
                  CSS
                </TabsTrigger>
                <TabsTrigger value="html" className="flex items-center gap-2">
                  {getTabIcon('html')}
                  HTML
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="javascript" className="flex-1">
                <CodeEditor
                  value={code}
                  onChange={setCode}
                  language="javascript"
                  className="h-full"
                />
              </TabsContent>
              <TabsContent value="css" className="flex-1">
                <CodeEditor
                  value={code}
                  onChange={setCode}
                  language="css"
                  className="h-full"
                />
              </TabsContent>
              <TabsContent value="html" className="flex-1">
                <CodeEditor
                  value={code}
                  onChange={setCode}
                  language="html"
                  className="h-full"
                />
              </TabsContent>
            </Tabs>
          </Card>

          {/* Results Panel */}
          <Card className="p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Compatibility Results</h2>
              <Badge variant="outline">
                {results.length} issues found
              </Badge>
            </div>
            
            <LinterResults 
              results={results} 
              isLoading={isLinting}
              className="flex-1"
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Linter;