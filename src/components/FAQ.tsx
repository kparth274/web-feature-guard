import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Baseline Auto-Linter?",
    answer: "Baseline Auto-Linter is a development tool that provides real-time compatibility feedback for web platform features. It helps you identify whether JavaScript APIs, CSS properties, and HTML elements are safe to use across different browsers, based on official Baseline data from web.dev."
  },
  {
    question: "How does it work?",
    answer: "The linter analyzes your code as you write it and cross-references web platform features against the official Baseline compatibility database. It provides instant feedback through inline warnings, hover tooltips, and the Problems panel, letting you know if a feature is widely supported, partially supported, or requires polyfills."
  },
  {
    question: "What languages and frameworks are supported?",
    answer: "Baseline Auto-Linter works with HTML, CSS, JavaScript, TypeScript, and React components out of the box. It can analyze any web-based code that uses standard web platform features."
  },
  {
    question: "Is it free to use?",
    answer: "Yes! Baseline Auto-Linter is completely free and open-source. You can use both the VS Code extension and the web-based code editor without any cost."
  },
  {
    question: "How do I install the VS Code extension?",
    answer: "You can install the extension by searching for 'Baseline Auto-Linter' in the VS Code marketplace, or by running 'code --install-extension baseline-auto-linter' from your command line. Check out our GitHub releases page for the latest version."
  },
  {
    question: "Can I use this in my CI/CD pipeline?",
    answer: "Absolutely! The linter can be integrated into your continuous integration and deployment workflows to catch compatibility issues before they reach production. This helps maintain consistent browser support across your entire codebase."
  },
  {
    question: "What's the difference between 'Partial Support' and 'Not Supported'?",
    answer: "'Partial Support' means the feature works in most modern browsers but may be missing in some (like Firefox desktop or Safari). 'Not Supported' means the feature has limited browser support and likely requires polyfills or alternative implementations for broad compatibility."
  },
  {
    question: "Does it suggest fixes for compatibility issues?",
    answer: "Yes! When the linter identifies a compatibility issue, it often provides polyfill recommendations and suggests alternative approaches that have better browser support. This helps you make informed decisions about how to implement features."
  },
  {
    question: "How often is the Baseline data updated?",
    answer: "The Baseline compatibility data is maintained by the web.dev team and is regularly updated as browser support changes. The linter uses the latest available data to ensure you're getting accurate, up-to-date compatibility information."
  },
  {
    question: "Can I customize which browsers to target?",
    answer: "Currently, the linter uses the official Baseline definition, which focuses on widely available features across major browsers. Future versions may include custom browser target configuration."
  }
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-20 px-6 bg-card/20 relative">
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[100px]"></div>
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground animate-fade-in-up">
            Everything you need to know about Baseline Auto-Linter
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg px-6 hover:border-primary/30 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <AccordionTrigger className="text-left hover:text-primary transition-colors hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
