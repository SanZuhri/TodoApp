# 📝 Minimal To-Do List

A clean, monochrome task management app built with React, TypeScript, and Tailwind CSS. Focus on productivity with a distraction-free interface featuring subtasks, filtering, and progress tracking.

## ✨ Features

- **Minimal Design** - Monochrome interface with subtle dot pattern background
- **Task Management** - Add, edit, delete tasks with priorities and categories
- **Task Organization** - Organize tasks with priorities and categories
- **Smart Filtering** - Search by text, filter by priority, category, and status
- **Progress Tracking** - Visual statistics, progress bar, and completion percentages
- **Pagination** - Efficient handling of large task lists (20 items per page)
- **Data Persistence** - Local storage with export/import JSON functionality
- **Dark/Light Mode** - Seamless theme switching with system preference detection
- **Responsive** - Optimized for desktop and mobile devices
- **Accessibility** - Keyboard navigation, ARIA labels, and screen reader support
- **Performance** - Optimized with React.memo, lazy loading, and efficient re-renders

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see your app.

## 📱 Usage

### Adding Tasks
1. Click "Add a new task" to expand the form
2. Enter task description
3. Select priority level (Low/Medium/High)
4. Click "Add Task" or press Enter

### Managing Tasks
- **Complete**: Click the checkbox to mark tasks as done
- **Edit**: Hover over task and click the edit icon to modify task text
- **Delete**: Hover over task and click the trash icon (with confirmation dialog)
- **Categories**: Tasks are automatically categorized based on usage

### Filtering & Search
- Use the search bar to find tasks by text or category
- Filter by priority (High/Medium/Low) and status (All/Completed/Pending)
- Filter by completion status
- Pagination for large lists (20 items per page)

### Settings & Data Management
- **Theme Toggle**: Switch between light/dark mode or use system preference
- **About**: View app information and features
- **Export**: Download your tasks as JSON file via Settings menu
- **Import**: Upload a previously exported JSON file via Settings menu
- **Local Storage**: All data is automatically saved locally

## 🏗️ Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** component library (selected components)
- **React Router** for navigation
- **next-themes** for theme management
- **Sonner** for toast notifications
- **Lucide React** for icons
- **UUID** for unique identifiers

## 📁 Project Structure

```
src/
├── features/todos/
│   ├── components/     # Todo-specific components
│   │   ├── TodoForm.tsx
│   │   ├── TodoItem.tsx
│   │   ├── TodoList.tsx
│   │   ├── TodoFilters.tsx
│   │   ├── TodoStats.tsx
│   │   └── ImportExport.tsx
│   ├── hooks/
│   │   └── useTodos.ts
│   ├── types/
│   │   └── todo.types.ts
│   └── TodosPage.tsx
├── components/
│   ├── ui/            # shadcn/ui components (used only)
│   └── common/        # Shared components
├── hooks/             # Custom hooks (used only)
├── lib/               # Utilities (used only)
└── pages/             # Page components
```

## 🎨 Design System

Monochrome color palette with subtle textures:

### Light Mode
- Background: Soft gray tones
- Foreground: Dark gray text
- Accents: Muted grays

### Dark Mode
- Background: Deep gray
- Foreground: Light gray
- Accents: Subtle gray highlights

## 🛠️ Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🌐 Deployment

Deploy to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

Run `npm run build` and deploy the `dist` folder.

## 📖 Learn More

- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Vite](https://vitejs.dev/)

## 🤝 Contributing

Feel free to:
- Report bugs
- Suggest features


## 📄 License

Free to use for personal and commercial projects.