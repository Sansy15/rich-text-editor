# Rich Text Editor

A feature-rich text editor built with [Lexical](https://lexical.dev/) and React. Supports tables, mathematical expressions (LaTeX/KaTeX), headings, lists, code blocks, and more—with save/load persistence via localStorage.

## Features

- **Rich text formatting** — Headings, quotes, lists, code blocks, links
- **Tables** — Insert and edit tables directly in the editor
- **Math expressions** — Inline and block math using LaTeX syntax (rendered with KaTeX)
- **Persistence** — Save and load document state to localStorage
- **Undo/redo** — Full history support
- **State management** — Zustand for editor and UI state

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — Build tool and dev server
- **Lexical** — Extensible text editor framework
- **Zustand** — Lightweight state management
- **KaTeX** — Math rendering

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
# Type-check and build for production
npm run build

# Preview production build
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── Editor/          # Lexical editor, toolbar, theme
│   ├── Math/            # Math node UI component
│   └── Toolbar/         # Toolbar buttons (table, math, save, load)
├── nodes/
│   └── MathNode.tsx     # Custom Lexical node for math
├── plugins/
│   ├── TablePlugin.tsx  # Table functionality
│   └── MathPlugin.tsx   # Math expression handling
├── store/
│   ├── editorStore.ts   # Editor state
│   └── uiStore.ts       # UI state
├── services/
│   └── persistence.ts   # Save/load to localStorage
├── utils/
│   ├── tableUtils.ts    # Table helpers
│   └── mathUtils.ts     # Math helpers
└── types/
    └── index.ts         # TypeScript types
```

## Architecture

- **Modular design** — Features (tables, math) live in dedicated plugins and nodes
- **Separation of concerns** — Editor logic, UI, and state are split into distinct layers
- **Plugin-based** — Uses Lexical’s plugin system for extensibility

## Documentation

- [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) — Implementation guide and phases
- [DESIGN_DECISIONS.md](./DESIGN_DECISIONS.md) — Architecture and design rationale
- [TESTING_GUIDE.md](./TESTING_GUIDE.md) — Testing instructions

## License

ISC
