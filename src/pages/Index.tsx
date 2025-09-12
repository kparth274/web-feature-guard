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
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Live Demo
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              See It In Action
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
              <Card className="p-6 border-success/20 bg-success/5">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-success mb-2">Safe to Use</h3>
                    <p className="text-sm text-muted-foreground">
                      Features with universal browser support across all major browsers.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 border-warning/20 bg-warning/5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-warning mb-2">Partial Support</h3>
                    <p className="text-sm text-muted-foreground">
                      Features missing in some browsers with specific recommendations.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 border-destructive/20 bg-destructive/5">
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-destructive mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-destructive mb-2">Not Supported</h3>
                    <p className="text-sm text-muted-foreground">
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
      <section className="py-20 px-6 bg-card/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Choose Baseline Auto-Linter?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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
              title="CLI Mode"
              description="Integrate into your CI/CD pipeline to catch compatibility issues before they reach production."
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
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Get Started in Minutes
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Install the extension and CLI tool to start catching compatibility issues immediately.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8 text-left">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                VS Code Extension
              </h3>
              <CodeBlock
                code={`# Search for "Baseline Auto-Linter" in VS Code
# Or install via command line:
code --install-extension baseline-auto-linter`}
                language="bash"
                className="mb-4"
              />
              <Link to="/linter">
                <Button className="w-full bg-gradient-primary">
                  Try Live Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </Card>
            
            <Card className="p-8 text-left">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Terminal className="h-5 w-5 text-primary" />
                CLI Tool
              </h3>
              <CodeBlock
                code={`# Install globally via npm
npm install -g baseline-auto-linter

# Run on your project
baseline-lint ./src`}
                language="bash"
                className="mb-4"
              />
              <Button variant="outline" className="w-full border-primary/20 hover:border-primary/50">
                View CLI Docs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          </div>
          
          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              Questions? Check out our comprehensive documentation or join our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline">
                📚 Documentation
              </Button>
              <Button variant="outline">
                💬 Community Discord
              </Button>
              <Button variant="outline">
                🐛 Report Issue
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;