# 📝 Minimal To-Do List

A clean, monochrome task management app built with React, TypeScript, and Tailwind CSS. Focus on productivity with a distraction-free interface.

## ✨ Features

- **Minimal Design** - Monochrome interface with subtle dot pattern background
- **Task Management** - Add, edit, delete tasks with categories, priorities, and due dates
- **Subtasks** - Break down tasks into smaller, manageable items
- **Smart Filtering** - Search by text, filter by priority, category, and status
- **Progress Tracking** - Visual statistics and progress bar
- **Data Persistence** - Local storage with export/import functionality
- **Dark Mode** - Seamless theme switching
- **Responsive** - Works perfectly on desktop and mobile

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
3. Optionally add category, priority, and due date
4. Click "Add Task" or press Enter

### Managing Tasks
- **Complete**: Click the checkbox to mark tasks as done
- **Edit**: Click the edit icon to modify task text
- **Delete**: Click the trash icon to remove tasks
- **Subtasks**: Click the plus icon to add subtasks

### Filtering & Search
- Use the search bar to find tasks by text or category
- Filter by priority (High/Medium/Low) and status (All/Completed/Pending)
- Filter by category (dynamically populated from existing tasks)

### Data Management
- **Export**: Download your tasks as JSON file
- **Import**: Upload a previously exported JSON file
- **Local Storage**: All data is automatically saved locally

## 🏗️ Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **React Router** for navigation
- **TanStack Query** for data management
- **Lucide React** for icons

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
├── components/ui/      # shadcn/ui components
├── hooks/              # Custom hooks
├── lib/                # Utilities
└── pages/              # Page components
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