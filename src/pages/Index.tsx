import { Hero } from "@/components/Hero";
import { FeatureCard } from "@/components/FeatureCard";
import { CodeBlock } from "@/components/CodeBlock";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Terminal, 
  Code, 
  Shield, 
  Zap, 
  Target, 
  Layers,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  XCircle
} from "lucide-react";

const demoCode = `// Example React component
import React, { useState } from 'react';

const MyComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  const handleClick = () => {
    // Using modern web APIs
    navigator.share({
      title: 'My App',
      url: window.location.href
    });
    
    // CSS-in-JS with modern properties
    document.body.style.scrollBehavior = 'smooth';
    document.body.style.backdropFilter = 'blur(10px)';
    
    // Using newer JavaScript features
    const items = [1, 2, 3].flatMap(x => [x, x * 2]);
  };
  
  return (
    <div className="container">
      <button onClick={handleClick}>Share</button>
    </div>
  );
};`;

const demoHighlights = [
  { line: 8, type: 'warning' as const, message: 'navigator.share() - Partial support: Not available in Firefox desktop' },
  { line: 13, type: 'success' as const, message: 'scroll-behavior - Widely supported across all major browsers' },
  { line: 14, type: 'destructive' as const, message: 'backdrop-filter - Limited support: Not supported in older browsers, consider fallback' },
  { line: 17, type: 'success' as const, message: 'Array.flatMap() - Widely supported in modern browsers' }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      {/* Demo Section */}
      <section className="py-20 px-6 relative">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 animate-scale-in">
              Live Demo
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
              See It In Action
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up">
              Watch how the linter identifies compatibility issues in real-time and provides actionable feedback.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <CodeBlock 
                code={demoCode}
                language="typescript"
                highlights={demoHighlights}
                className="h-fit"
              />
            </div>
            
            <div className="space-y-4">
              <Card className="p-6 border-success/20 bg-success/5 hover:border-success/40 hover:bg-success/10 transition-all duration-300 hover:scale-[1.02] group cursor-default">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="font-semibold text-success mb-2 group-hover:text-success/90">Safe to Use</h3>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors">
                      Features with universal browser support across all major browsers.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 border-warning/20 bg-warning/5 hover:border-warning/40 hover:bg-warning/10 transition-all duration-300 hover:scale-[1.02] group cursor-default">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-warning mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="font-semibold text-warning mb-2 group-hover:text-warning/90">Partial Support</h3>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors">
                      Features missing in some browsers with specific recommendations.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 border-destructive/20 bg-destructive/5 hover:border-destructive/40 hover:bg-destructive/10 transition-all duration-300 hover:scale-[1.02] group cursor-default">
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-destructive mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="font-semibold text-destructive mb-2 group-hover:text-destructive/90">Not Supported</h3>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors">
                      Features requiring polyfills or alternative implementations.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-6 bg-card/20 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
              Why Choose Baseline Auto-Linter?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up">
              Streamline your development workflow with intelligent compatibility checking and automated fix suggestions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Code className="h-6 w-6" />}
              title="IDE Integration"
              description="Real-time compatibility checking directly in VS Code with inline warnings and suggestions as you type."
            />
            
            <FeatureCard
              icon={<Terminal className="h-6 w-6" />}
              title="Immediate Flagging"
              description="Baseline Auto Linter immediately flags unsupported/partially supported code snippets."
            />
            
            <FeatureCard
              icon={<Shield className="h-6 w-6" />}
              title="Baseline Data"
              description="Powered by official Baseline compatibility data from web.dev for accurate, up-to-date information."
            />
            
            <FeatureCard
              icon={<Zap className="h-6 w-6" />}
              title="Instant Feedback"
              description="Get immediate answers to 'is it safe to use?' without switching between documentation sites."
            />
            
            <FeatureCard
              icon={<Target className="h-6 w-6" />}
              title="Smart Suggestions"
              description="Receive polyfill recommendations and alternative approaches for unsupported features."
            />
            
            <FeatureCard
              icon={<Layers className="h-6 w-6" />}
              title="Multi-Language Support"
              description="Works with HTML, CSS, JavaScript, TypeScript, and React components out of the box."
            />
          </div>
        </div>
      </section>
      
      {/* Installation Section */}
      <section className="py-20 px-6 relative">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/10 rounded-full blur-[100px]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
            Get Started in Minutes
          </h2>
          <p className="text-xl text-muted-foreground mb-12 animate-fade-in-up">
            Install the extension and CLI tool to start catching compatibility issues immediately.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8 text-left hover:shadow-glow/20 transition-all duration-300 hover:scale-[1.02] border-border/50 hover:border-primary/30 group">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 group-hover:text-primary transition-colors">
                <Code className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                Web Demo
              </h3>
              <CodeBlock
                code={`# Open the Baseline Auto-Linter web demo to explore real-time compatibility checks.  
# Try the provided sample code in the editor or paste in your own HTML, CSS, or JavaScript.  
# See instantly which features are supported across browsers.`}
                language="bash"
                className="mb-4"
              />
              <Link to="/linter">
                <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 hover:scale-105">
                  Try Live Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </Card>
            
            <Card className="p-8 text-left hover:shadow-glow/20 transition-all duration-300 hover:scale-[1.02] border-border/50 hover:border-primary/30 group">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 group-hover:text-primary transition-colors">
                <Terminal className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                VSCode Extension
              </h3>
              <CodeBlock
                code={`# Search for "Baseline Auto-Linter" in VS Code.  
# Or install via command line:  
code --install-extension baseline-auto-linter`}
                language="bash"
                className="mb-4"
              />
              <Link to="https://github.com/kparth274/web-feature-guard/releases/tag/v0.0.1">
               <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 hover:scale-105">
                  Try the VSCode Extension
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                </Link>
            </Card>
          </div>
          
          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              Questions? Visit our Github page for any further queries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="https://github.com/kparth274/web-feature-guard"><Button variant="outline" className="hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:scale-105">
                Github
              </Button></Link>
              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;