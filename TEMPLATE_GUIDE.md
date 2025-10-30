# 📘 Template Usage Guide

Simple guide for using this Ultimate React Template.

## 🎯 Quick Start

### Initial Setup

```bash
# Clone and install
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install

# Start developing
npm run dev
```

### First Steps

1. Update `index.html` - Change title and meta tags
2. Update `README.md` - Add your project info
3. Review `src/lib/constants.ts` - Update constants
4. Start building your pages in `src/pages/`

## 📁 Project Structure

```
src/
├── components/
│   ├── common/          # Loading, ErrorBoundary, EmptyState
│   ├── layout/          # Container, Section, PageHeader
│   └── ui/              # 50+ shadcn/ui components
├── hooks/               # Custom React hooks
│   ├── useDebounce.ts
│   ├── useLocalStorage.ts
│   ├── useMediaQuery.ts
│   └── more...
├── lib/                 # Utilities
│   ├── api.ts          # HTTP client
│   ├── constants.ts    # App constants
│   ├── format.ts       # Formatting helpers
│   ├── storage.ts      # Storage helpers
│   └── validators.ts   # Validation helpers
├── pages/              # Your pages
│   ├── Index.tsx
│   └── NotFound.tsx
└── types/              # TypeScript types
```

## 🎨 Design System

Colors are defined in `src/index.css` using HSL values. The template uses a warm neutral palette for light mode and soft gray-blue for dark mode.

### Using Colors

Always use semantic tokens:

```tsx
// ✅ Good
<div className="bg-primary text-primary-foreground">

// ❌ Avoid
<div className="bg-gray-800 text-white">
```

Available tokens:
- `primary` / `primary-foreground`
- `secondary` / `secondary-foreground`
- `muted` / `muted-foreground`
- `accent` / `accent-foreground`
- `destructive` / `destructive-foreground`
- `border`, `input`, `ring`

## 🔧 Common Tasks

### Adding a New Page

1. Create page in `src/pages/`:

```tsx
// src/pages/About.tsx
import { Container } from "@/components/layout/Container";

export default function About() {
  return (
    <Container>
      <h1 className="text-2xl font-semibold mb-4">About</h1>
      <p className="text-muted-foreground">Your content here</p>
    </Container>
  );
}
```

2. Add route in `src/App.tsx`:

```tsx
import About from "./pages/About";

<Routes>
  <Route path="/about" element={<About />} />
</Routes>
```

### Using API Client

```tsx
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

function MyComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => api.get("/users"),
  });

  if (isLoading) return <p>Loading...</p>;
  
  return <div>{/* render data */}</div>;
}
```

### Form Validation

```tsx
import { validators, validationMessages } from "@/lib/validators";

function MyForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validators.email(email)) {
      setError(validationMessages.email);
      return;
    }
    
    // Submit form
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </form>
  );
}
```

### Using Custom Hooks

```tsx
import { useDebounce } from "@/hooks/useDebounce";
import { useLocalStorage } from "@/hooks/useLocalStorage";

function MyComponent() {
  // Debounce search
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  // Persist in localStorage
  const [theme, setTheme] = useLocalStorage("theme", "light");

  return (
    <div>
      <input 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <p>Debounced: {debouncedSearch}</p>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle theme
      </button>
    </div>
  );
}
```

### Formatting Data

```tsx
import { formatDate, formatCurrency, formatFileSize } from "@/lib/format";

function Display() {
  return (
    <div>
      <p>{formatDate(new Date())}</p>
      <p>{formatCurrency(1999.99)}</p>
      <p>{formatFileSize(1024000)}</p>
    </div>
  );
}
```

## 📦 Components

### Layout Components

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";

function MyPage() {
  return (
    <Container size="comfortable">
      <PageHeader 
        title="My Page"
        description="Page description"
        action={<Button>Action</Button>}
      />
      <Section>
        {/* Your content */}
      </Section>
    </Container>
  );
}
```

### Common Components

```tsx
import { Loading } from "@/components/common/Loading";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

// Loading
<Loading size="md" text="Loading..." />

// Empty State
<EmptyState 
  title="No data"
  description="Try adding some items"
  action={<Button>Add Item</Button>}
/>

// Error Boundary
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

## 🎯 Best Practices

### Component Structure

```tsx
// 1. Imports
import { useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";

// 2. Types
interface MyComponentProps {
  userId: string;
}

// 3. Component
export function MyComponent({ userId }: MyComponentProps) {
  // 4. State & hooks
  const [data, setData] = useState();
  
  // 5. Handlers
  const handleClick = () => {};
  
  // 6. Effects
  useEffect(() => {}, []);
  
  // 7. Render
  return <div>...</div>;
}
```

### Naming Conventions

- Components: `PascalCase`
- Hooks: `camelCase` with `use` prefix
- Utils: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Types: `PascalCase`

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

### Deploy Options

- **Lovable**: Click Publish button
- **Vercel/Netlify**: Connect GitHub and auto-deploy
- **Custom**: Deploy `dist` folder to any static host

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Lovable Docs](https://docs.lovable.dev/)

---

Happy coding! 🎉
