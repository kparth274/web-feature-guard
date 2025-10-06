import { Button } from "@/components/ui/button";
import { Moon, Sun, Github, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-primary-foreground font-bold text-sm">BL</span>
            </div>
            <span className="font-bold text-lg hidden sm:block">Baseline Linter</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("features")} className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </button>
            <button onClick={() => scrollToSection("demo")} className="text-muted-foreground hover:text-foreground transition-colors">
              Demo
            </button>
            <button onClick={() => scrollToSection("testimonials")} className="text-muted-foreground hover:text-foreground transition-colors">
              Feedback
            </button>
            <button onClick={() => scrollToSection("faq")} className="text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-primary/10 transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-primary" />
              ) : (
                <Moon className="h-5 w-5 text-primary" />
              )}
            </Button>

            <Link to="https://github.com/kparth274/web-feature-guard" className="hidden sm:block">
              <Button variant="outline" size="sm" className="hover:border-primary/50 hover:bg-primary/5">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </Link>

            <Link to="/linter" className="hidden sm:block">
              <Button size="sm" className="bg-gradient-primary hover:shadow-glow transition-all">
                Try Demo
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 animate-fade-in">
            <button onClick={() => scrollToSection("features")} className="block w-full text-left py-2 text-muted-foreground hover:text-foreground transition-colors">
              Features
            </button>
            <button onClick={() => scrollToSection("demo")} className="block w-full text-left py-2 text-muted-foreground hover:text-foreground transition-colors">
              Demo
            </button>
            <button onClick={() => scrollToSection("testimonials")} className="block w-full text-left py-2 text-muted-foreground hover:text-foreground transition-colors">
              Feedback
            </button>
            <button onClick={() => scrollToSection("faq")} className="block w-full text-left py-2 text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </button>
            <Link to="https://github.com/kparth274/web-feature-guard" className="block">
              <Button variant="outline" size="sm" className="w-full mt-2">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </Link>
            <Link to="/linter" className="block">
              <Button size="sm" className="w-full bg-gradient-primary">
                Try Demo
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
