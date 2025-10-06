import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Download, Github } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: "1s" }}></div>
      
      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgo8cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJoc2woMjIwLCAxMyUsIDE4JSkiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+CjwvcGF0dGVybj4KPC9kZWZzPgo8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+Cjwvc3ZnPg==')] opacity-20"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <Badge variant="secondary" className="mb-6 px-4 py-2 animate-fade-in">
          🚀 Developer Tool
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight animate-fade-in-up">
          Baseline Auto-Linter
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Eliminate the uncertainty of "is it safe to use this feature?" 
          Get <span className="text-primary font-semibold relative inline-block after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-primary/30 after:rounded">instant compatibility feedback</span> for web platform features directly in your IDE and CI/CD pipeline.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <Link to="/linter">
            <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300 hover:scale-105 animate-pulse-glow">
              <Download className="mr-2 h-5 w-5" />
              Try Live Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="https://github.com/kparth274/web-feature-guard">
          <Button variant="outline" size="lg" className="border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:scale-105">
            <Github className="mr-2 h-5 w-5" />
            View on GitHub
          </Button>
          </Link>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="flex items-center gap-2 group cursor-default">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
            <span className="group-hover:text-foreground transition-colors">VS Code Extension</span>
          </div>
          <div className="flex items-center gap-2 group cursor-default">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.3s" }}></div>
            <span className="group-hover:text-foreground transition-colors">Web Code Editor</span>
          </div>
          <div className="flex items-center gap-2 group cursor-default">
            <div className="w-2 h-2 rounded-full bg-warning animate-pulse" style={{ animationDelay: "0.6s" }}></div>
            <span className="group-hover:text-foreground transition-colors">Real-time Feedback</span>
          </div>
        </div>
      </div>
    </section>
  );
};