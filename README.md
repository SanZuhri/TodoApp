# 🚀 Ultimate React Template

A clean, minimalist React starter template with everything you need to build modern web applications.

## ✨ Features

- **Simple & Clean Design** - Minimalist interface with warm neutral colors
- **Complete Foundation** - Design system, utilities, hooks, and 50+ UI components
- **Production Ready** - TypeScript, Tailwind CSS, React Query, and more
- **Well Documented** - Comprehensive guides and examples

## 📦 What's Included

### Core Stack
- React 18 with TypeScript
- Vite for fast builds
- Tailwind CSS for styling
- shadcn/ui component library
- React Router for navigation
- TanStack Query for data fetching

### Utilities & Helpers
- **API Client** - Complete HTTP client with error handling
- **Validators** - Form validation helpers
- **Formatters** - Date, currency, file size formatting
- **Storage** - Type-safe localStorage/sessionStorage

### Custom Hooks
- `useDebounce` - Debounce values
- `useLocalStorage` - Sync state with localStorage
- `useMediaQuery` - Responsive breakpoints
- `useOnClickOutside` - Detect outside clicks
- `useCopyToClipboard` - Copy to clipboard

### Components
- Layout components (Container, Section, PageHeader)
- Common components (Loading, ErrorBoundary, EmptyState)
- 50+ UI components from shadcn/ui

## 🚀 Quick Start

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development
npm run dev
```

Visit `http://localhost:8080` to see your app.

## 📁 Project Structure

```
src/
├── components/
│   ├── common/        # Reusable components
│   ├── layout/        # Layout components
│   └── ui/           # shadcn/ui components
├── hooks/            # Custom React hooks
├── lib/              # Utilities and helpers
├── pages/            # Page components
└── types/            # TypeScript definitions
```

## 🎨 Design System

Simple, warm neutral color palette with full dark mode support. All colors are defined as HSL values in `src/index.css`.

### Light Mode
- Background: Warm beige-gray
- Foreground: Soft dark brown-gray
- Primary: Muted brownish-gray

### Dark Mode  
- Background: Soft neutral gray-blue
- Foreground: Light gray
- Primary: Light gray-blue

## 📚 Documentation

- **README.md** - This file, project overview
- **TEMPLATE_GUIDE.md** - Detailed usage guide with examples
- **.env.example** - Environment variables template

## 🛠️ Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🌐 Deployment

Deploy to any static hosting:
- Lovable (built-in)
- Vercel
- Netlify
- Cloudflare Pages

Just run `npm run build` and deploy the `dist` folder.

## 📖 Learn More

- [Lovable Documentation](https://docs.lovable.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

## 🤝 Contributing

Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

Free to use for personal and commercial projects.

---

Built with ❤️ using [Lovable](https://lovable.dev)
