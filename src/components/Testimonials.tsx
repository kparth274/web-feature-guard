import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Frontend Developer",
    company: "TechCorp",
    content: "This tool has saved us countless hours of debugging browser compatibility issues. The real-time feedback is invaluable.",
    rating: 5,
    initials: "SC"
  },
  {
    name: "Marcus Rodriguez",
    role: "Full Stack Engineer",
    company: "StartupXYZ",
    content: "Finally, a linter that actually understands web platform features. The Baseline integration is brilliant.",
    rating: 5,
    initials: "MR"
  },
  {
    name: "Aisha Patel",
    role: "Lead Developer",
    company: "DigitalAgency",
    content: "The VS Code extension is seamless. It catches compatibility issues before they make it to production.",
    rating: 5,
    initials: "AP"
  },
  {
    name: "Tom Williams",
    role: "JavaScript Developer",
    company: "WebSolutions",
    content: "Love how it suggests polyfills and alternatives. It's like having a compatibility expert on the team.",
    rating: 5,
    initials: "TW"
  },
  {
    name: "Elena Popov",
    role: "Engineering Manager",
    company: "CloudServices",
    content: "We've integrated this into our CI/CD pipeline. Compatibility issues are now caught before code review.",
    rating: 5,
    initials: "EP"
  },
  {
    name: "James Kim",
    role: "React Developer",
    company: "AppStudio",
    content: "The inline warnings saved me from shipping broken code to older browsers. This is a must-have tool.",
    rating: 5,
    initials: "JK"
  }
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 px-6 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
            Loved by Developers
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up">
            Join thousands of developers who trust Baseline Auto-Linter for compatibility checking.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] group cursor-default animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary group-hover:scale-110 transition-transform" style={{ transitionDelay: `${i * 0.05}s` }} />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed group-hover:text-foreground/80 transition-colors">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-primary/20 group-hover:border-primary/40 transition-colors">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-sm group-hover:text-primary transition-colors">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
