import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Github, 
  ExternalLink, 
  BookOpen,
  Code2,
  Palette,
  Zap,
  Box,
  FileCode,
  Rocket
} from "lucide-react";

const Index = () => {
  const quickStart = [
    { name: "Design System", desc: "Complete color & animation tokens" },
    { name: "Components", desc: "50+ UI components ready to use" },
    { name: "Utilities", desc: "API, validators, formatters" },
    { name: "Hooks", desc: "5 custom React hooks" },
  ];

  const features = [
    { name: "React 18", tech: "Latest React features" },
    { name: "TypeScript", tech: "Full type safety" },
    { name: "Tailwind CSS", tech: "Utility-first styling" },
    { name: "Vite", tech: "Lightning fast builds" },
    { name: "React Query", tech: "Data fetching" },
    { name: "shadcn/ui", tech: "Beautiful components" },
  ];

  const structure = [
    { 
      title: "Design System", 
      desc: "Colors, gradients, shadows, animations defined in index.css",
      icon: Palette,
      badge: "Essential"
    },
    { 
      title: "Components", 
      desc: "Common, layout, and 50+ UI components ready to customize",
      icon: Box,
      badge: "50+ Ready"
    },
    { 
      title: "Utilities", 
      desc: "API client, validators, formatters, storage helpers",
      icon: Code2,
      badge: "Complete"
    },
    { 
      title: "Custom Hooks", 
      desc: "useDebounce, useLocalStorage, useMediaQuery, and more",
      icon: Zap,
      badge: "5 Hooks"
    },
  ];

  const tools = [
    { category: "CORE", items: ["React", "TypeScript", "Vite", "Tailwind CSS"] },
    { category: "UI", items: ["shadcn/ui", "Lucide Icons", "Radix UI"] },
    { category: "DATA", items: ["React Query", "Axios Ready", "Form Handling"] },
    { category: "UTILS", items: ["Storage", "Validators", "Formatters", "API Client"] },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
              <Rocket className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Ultimate React Template</h1>
              <p className="text-sm text-muted-foreground">Production-ready starter</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Production-Ready React Template
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            A comprehensive starter template with everything you need to build modern web applications. 
            Includes design system, utilities, custom hooks, and 50+ UI components. Just clone and start developing.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                View on GitHub
              </a>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <a href="#documentation">
                <BookOpen className="h-4 w-4 mr-2" />
                Read documentation
              </a>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <a href="https://docs.lovable.dev" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Lovable docs
              </a>
            </Button>
          </div>
        </section>

        {/* Quick Start */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Quick Start
            </h3>
          </div>
          <div className="space-y-2">
            {quickStart.map((item) => (
              <Card key={item.name} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Tech Stack
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.name} className="p-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{feature.name}</p>
                  <p className="text-xs text-muted-foreground">{feature.tech}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* What's Inside */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              What's Inside
            </h3>
            <Button variant="ghost" size="sm" className="text-xs" asChild>
              <a href="#structure">View structure →</a>
            </Button>
          </div>
          <div className="space-y-2">
            {structure.map((item) => (
              <Card key={item.title} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{item.title}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Installation */}
        <section className="space-y-3">
          <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Installation
          </h3>
          <Card className="p-4 bg-muted/50">
            <pre className="text-sm overflow-x-auto scrollbar-hide">
              <code>{`# Clone the repository
git clone <YOUR_GIT_URL>

# Install dependencies
npm install

# Start development server
npm run dev`}</code>
            </pre>
          </Card>
        </section>

        {/* Tools & Libraries */}
        <section id="documentation" className="space-y-3">
          <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Tools & Libraries
          </h3>
          <p className="text-sm text-muted-foreground">
            Everything you need to build modern web applications
          </p>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {tools.map((tool) => (
              <div key={tool.category} className="space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground">
                  {tool.category}
                </h4>
                <ul className="space-y-1">
                  {tool.items.map((item) => (
                    <li key={item} className="text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Documentation Links */}
        <section className="space-y-3">
          <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Documentation
          </h3>
          <div className="space-y-2">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">README.md</h4>
                  <p className="text-sm text-muted-foreground">Complete project overview and setup</p>
                </div>
                <FileCode className="h-5 w-5 text-muted-foreground" />
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">TEMPLATE_GUIDE.md</h4>
                  <p className="text-sm text-muted-foreground">Detailed usage guide and examples</p>
                </div>
                <FileCode className="h-5 w-5 text-muted-foreground" />
              </div>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-8 pb-16 border-t border-border">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>© 2025 Ultimate React Template. All rights reserved.</p>
            <div className="flex gap-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
              <a 
                href="https://lovable.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
