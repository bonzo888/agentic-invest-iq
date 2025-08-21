# Portfolio Investment Frontend

React-based frontend for the agentic investment framework. Built with TypeScript, Vite, and modern React patterns.

## Technology Stack

- **React 18+** with TypeScript
- **Vite** for build tooling and development server
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Recharts** for data visualization
- **React Hook Form + Zod** for form handling and validation
- **Axios** for API communication
- **Lucide React** for icons

## Quick Start

### Prerequisites
- Node.js 18+
- Docker (optional)

### Development Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Access the application**
   - Local: http://localhost:3000

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Docker Development

### Development Mode (with hot reload)
```bash
# Build development image
docker build -t portfolio-frontend:dev --target development .

# Run with volume mounting for hot reload
docker run -p 3000:3000 -v $(pwd):/app portfolio-frontend:dev
```

### Production Mode
```bash
# Build production image
docker build -t portfolio-frontend:prod --target production .

# Run production container
docker run -p 80:80 portfolio-frontend:prod
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Base components (Button, Input, Loading)
│   └── features/       # Feature-specific components
├── hooks/              # Custom React hooks
├── services/           # API and external service integrations
├── store/              # Redux store and slices
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and helpers
├── styles/             # Global styles and CSS variables
└── pages/              # Page components
```

## Component Architecture

### Base Components
Located in `src/components/common/`, these are reusable UI primitives:
- **Button** - Styled button with variants and loading states
- **Input** - Form input with validation support
- **Loading** - Loading indicators with different styles
- **Modal** - Overlay dialogs and modals
- **Layout** - Page layout components

### Feature Components
Located in `src/components/features/`, organized by domain:
- **auth/** - Authentication forms and guards
- **dashboard/** - Portfolio summary and metrics
- **portfolio/** - Portfolio table and position details
- **trading/** - Order forms and trade history
- **agents/** - Agent status and recommendations
- **settings/** - User preferences and configuration

## State Management

Using Redux Toolkit with the following slices:
- **authSlice** - User authentication and profile
- **portfolioSlice** - Portfolio data and positions
- **tradingSlice** - Orders and trade history
- **agentSlice** - Agent status and recommendations
- **uiSlice** - UI state (modals, notifications)

## Styling

### CSS Architecture
- **CSS Custom Properties** for theming (`src/styles/variables.css`)
- **Global styles** for base elements (`src/styles/globals.css`)
- **Component-specific CSS** co-located with components
- **BEM methodology** for CSS class naming

### Design System
Colors, spacing, and typography are defined in CSS custom properties:
```css
:root {
  --color-primary: #3b82f6;
  --color-success: #10b981;
  --color-danger: #ef4444;
  --spacing-md: 1rem;
  --border-radius: 0.5rem;
}
```

## API Integration

### Service Layer
API calls are organized in `src/services/api/`:
- **auth.api.ts** - Authentication endpoints
- **portfolio.api.ts** - Portfolio and position data
- **trading.api.ts** - Order management
- **agents.api.ts** - Agent interactions

### Error Handling
- Global error boundaries for React component errors
- API error interceptors with retry logic
- User-friendly error messages and fallbacks

## Real-time Updates

WebSocket integration for live data:
- Portfolio value updates
- Trade execution notifications
- Agent status changes
- Market data streams

## Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow React functional component patterns
- Implement proper error boundaries
- Use custom hooks for business logic
- Keep components small and focused

### Performance
- Lazy load route components
- Memoize expensive calculations
- Optimize re-renders with React.memo
- Use proper dependency arrays in hooks

### Testing
- Unit tests for utility functions
- Component tests with React Testing Library
- Integration tests for user workflows
- E2E tests for critical paths

## Environment Variables

Create a `.env.local` file:
```env
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000/ws
VITE_APP_NAME=Portfolio Investment
```

## Build Configuration

### Vite Configuration
The `vite.config.ts` includes:
- TypeScript compilation
- React Fast Refresh
- Path aliases for imports
- Environment variable handling
- Build optimizations

### Production Build
The production build:
- Minifies JavaScript and CSS
- Optimizes assets
- Generates source maps
- Includes service worker for caching

## Deployment

### Docker Multi-stage Build
- **Development stage**: Hot reload and debugging
- **Build stage**: Asset compilation
- **Production stage**: Nginx serving optimized assets

### Nginx Configuration
Includes:
- Client-side routing support
- Asset caching headers
- Gzip compression
- Security headers

## Troubleshooting

### Common Issues

1. **Dependencies not found**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Port already in use**
   ```bash
   npx kill-port 3000
   npm run dev
   ```

3. **TypeScript errors**
   ```bash
   npx tsc --noEmit
   ```

4. **Docker build issues**
   ```bash
   docker system prune -a
   docker build --no-cache -t portfolio-frontend .
   ```

### Debug Mode
Enable debug logging:
```bash
DEBUG=true npm run dev
```

### Hot Reload Issues
If hot reload stops working:
1. Check if files are properly saved
2. Restart the development server
3. Clear browser cache
4. Check for TypeScript errors in console
