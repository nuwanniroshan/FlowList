# FlowList - Minimal Focus Todo Application

A minimal, focus-oriented todo application with mood-based prioritization and distraction-free Flow Mode.

## Features

- **Flow Mode**: Distraction-free, full-screen focus on one task at a time
- **Mood-Based Prioritization**: Tasks automatically reorder based on your current mental state
- **Smart Clusters**: Automatic task grouping by detected keywords
- **Time-Slip**: One-tap task deferral to tomorrow
- **Offline-First**: Full PWA support with offline functionality
- **Local Storage**: All data stored locally using IndexedDB

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **State Management**: Redux Toolkit
- **UI Framework**: Material UI (MUI) v5
- **Build Tool**: Vite
- **Database**: IndexedDB (via Dexie.js)
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **PWA**: Vite PWA Plugin

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd flowlist
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will open at [http://localhost:3000](http://localhost:3000)

### Building for Production

Create an optimized production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors automatically |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Check TypeScript types |
| `npm test` | Run tests with Vitest |
| `npm run test:coverage` | Run tests with coverage |

## Project Structure

```
flowlist/
├── src/
│   ├── app/              # Redux store, theme, and app configuration
│   ├── features/         # Feature-based modules
│   │   ├── tasks/        # Task management
│   │   ├── flow/         # Flow Mode
│   │   ├── mood/         # Mood-based prioritization
│   │   └── clusters/     # Smart clusters
│   ├── components/       # Reusable components
│   │   ├── common/       # Common UI components
│   │   └── layout/       # Layout components
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript type definitions
│   ├── db/               # IndexedDB configuration
│   ├── styles/           # Global styles
│   ├── App.tsx           # Root component
│   └── main.tsx          # Application entry point
├── docs/                 # Documentation
├── public/               # Static assets
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies
```

## Path Aliases

The project uses TypeScript path aliases for cleaner imports:

- `@/*` → `src/*`
- `@/components/*` → `src/components/*`
- `@/features/*` → `src/features/*`
- `@/app/*` → `src/app/*`
- `@/hooks/*` → `src/hooks/*`
- `@/utils/*` → `src/utils/*`
- `@/types/*` → `src/types/*`
- `@/db/*` → `src/db/*`
- `@/styles/*` → `src/styles/*`

Example:
```typescript
import { TaskCard } from '@/components/common/TaskCard';
import { useAppDispatch } from '@/app/hooks';
```

## Code Quality

### ESLint

The project uses ESLint with Airbnb + TypeScript configuration:
```bash
npm run lint
```

### Prettier

Code formatting with Prettier:
```bash
npm run format
```

### TypeScript

Strict mode enabled for type safety:
```bash
npm run type-check
```

## Development Guidelines

### Commit Messages

Follow conventional commits format:
```
type(scope): subject

Examples:
feat(tasks): add task creation functionality
fix(flow): resolve navigation issue
docs(readme): update installation instructions
```

### Code Style

- Use functional components with hooks
- Prefer TypeScript interfaces over types
- Use named exports for components
- Follow the single responsibility principle
- Write self-documenting code with clear names

## Troubleshooting

### Port 3000 already in use

If port 3000 is already in use, you can change it in `vite.config.ts`:
```typescript
server: {
  port: 3001, // Change to any available port
}
```

### TypeScript errors after installation

Run type checking to see detailed errors:
```bash
npm run type-check
```

### Build size warnings

The project is configured with code splitting to keep bundle sizes small. If you see warnings, check the `vite.config.ts` manual chunks configuration.

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## PWA Features

- Installable as standalone app
- Offline functionality
- Service Worker caching
- Background sync (planned)

## Documentation

- [Product Requirements Document](docs/prd.md)
- [Design System](docs/design-system.md)
- [Architecture](docs/architecture.md)
- [Epics & Stories](docs/sprint-artifacts/epics-and-stories.md)

## License

MIT

## Contributing

Contributions are welcome! Please read the contributing guidelines before submitting PRs.

## Support

For issues and questions, please open an issue on GitHub.