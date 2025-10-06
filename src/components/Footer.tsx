import { Link } from "react-router-dom";
import { Github, Heart } from "lucide-react";

export const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-card/30 border-t border-border/50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">BL</span>
              </div>
              <span className="font-bold text-lg">Baseline Linter</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Real-time browser compatibility checking for modern web development. 
              Catch compatibility issues before they reach production.
            </p>
            <Link to="https://github.com/kparth274/web-feature-guard" className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
              <Github className="h-4 w-4" />
              View on GitHub
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => scrollToSection("features")} className="text-muted-foreground hover:text-primary transition-colors">
                  Features
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("demo")} className="text-muted-foreground hover:text-primary transition-colors">
                  Live Demo
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("testimonials")} className="text-muted-foreground hover:text-primary transition-colors">
                  Testimonials
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("faq")} className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/linter" className="text-muted-foreground hover:text-primary transition-colors">
                  Web Editor
                </Link>
              </li>
              <li>
                <a href="https://github.com/kparth274/web-feature-guard/releases" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  VS Code Extension
                </a>
              </li>
              <li>
                <a href="https://github.com/kparth274/web-feature-guard" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="https://web.dev/baseline" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  About Baseline
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Baseline Auto-Linter. Open source under MIT License.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            Made with <Heart className="h-4 w-4 text-primary fill-primary animate-pulse" /> by developers, for developers
          </p>
        </div>
      </div>
    </footer>
  );
};
