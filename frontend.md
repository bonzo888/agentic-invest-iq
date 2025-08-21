# Frontend Low-Level Design - React Investment Dashboard

## Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.types.ts
│   │   │   ├── Button.styles.ts
│   │   │   └── index.ts
│   │   ├── Input/
│   │   ├── Modal/
│   │   ├── Loading/
│   │   ├── ErrorBoundary/
│   │   └── Layout/
│   │       ├── Header/
│   │       ├── Sidebar/
│   │       ├── Footer/
│   │       └── MainLayout/
│   ├── features/
│   │   ├── auth/
│   │   │   ├── LoginForm/
│   │   │   └── ProtectedRoute/
│   │   ├── dashboard/
│   │   │   ├── PortfolioSummary/
│   │   │   ├── PerformanceChart/
│   │   │   ├── RecentTrades/
│   │   │   └── MarketOverview/
│   │   ├── portfolio/
│   │   │   ├── PortfolioTable/
│   │   │   ├── PositionCard/
│   │   │   ├── AllocationChart/
│   │   │   └── RiskMetrics/
│   │   ├── trading/
│   │   │   ├── TradingPanel/
│   │   │   ├── OrderForm/
│   │   │   ├── OrderHistory/
│   │   │   └── WatchList/
│   │   ├── agents/
│   │   │   ├── AgentStatus/
│   │   │   ├── AgentRecommendations/
│   │   │   ├── AgentConfig/
│   │   │   └── AgentLogs/
│   │   └── settings/
│   │       ├── UserProfile/
│   │       ├── TradingSettings/
│   │       ├── RiskSettings/
│   │       └── NotificationSettings/
├── hooks/
│   ├── useAuth.ts
│   ├── usePortfolio.ts
│   ├── useWebSocket.ts
│   ├── useAgents.ts
│   ├── useTrades.ts
│   └── useLocalStorage.ts
├── services/
│   ├── api/
│   │   ├── auth.api.ts
│   │   ├── portfolio.api.ts
│   │   ├── trading.api.ts
│   │   ├── agents.api.ts
│   │   └── market.api.ts
│   ├── websocket/
│   │   ├── websocket.service.ts
│   │   └── websocket.types.ts
│   └── storage/
│       ├── localStorage.service.ts
│       └── sessionStorage.service.ts
├── store/
│   ├── index.ts
│   ├── authSlice.ts
│   ├── portfolioSlice.ts
│   ├── tradingSlice.ts
│   ├── agentSlice.ts
│   └── uiSlice.ts
├── types/
│   ├── auth.types.ts
│   ├── portfolio.types.ts
│   ├── trading.types.ts
│   ├── agent.types.ts
│   ├── market.types.ts
│   └── common.types.ts
├── utils/
│   ├── formatters.ts
│   ├── validators.ts
│   ├── constants.ts
│   ├── calculations.ts
│   └── helpers.ts
├── styles/
│   ├── globals.css
│   ├── variables.css
│   └── themes/
│       ├── light.theme.ts
│       └── dark.theme.ts
├── pages/
│   ├── Dashboard/
│   ├── Portfolio/
│   ├── Trading/
│   ├── Agents/
│   ├── Settings/
│   └── Auth/
├── App.tsx
├── main.tsx
└── router.tsx
```

## Core Type Definitions

### Common Types

```typescript
// types/common.types.ts
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}
```

### Portfolio Types

```typescript
// types/portfolio.types.ts
export interface Position extends BaseEntity {
  symbol: string;
  quantity: number;
  averageCost: number;
  currentPrice: number;
  marketValue: number;
  unrealizedPnL: number;
  unrealizedPnLPercent: number;
  sector: string;
  assetType: "stock" | "etf" | "crypto";
}

export interface Portfolio extends BaseEntity {
  userId: string;
  totalValue: number;
  totalCost: number;
  totalPnL: number;
  totalPnLPercent: number;
  dayPnL: number;
  dayPnLPercent: number;
  cashBalance: number;
  positions: Position[];
  allocation: AllocationData[];
}

export interface AllocationData {
  category: string;
  value: number;
  percentage: number;
  color: string;
}
```

### Trading Types

```typescript
// types/trading.types.ts
export interface Order extends BaseEntity {
  symbol: string;
  side: "buy" | "sell";
  type: "market" | "limit" | "stop_loss";
  quantity: number;
  price?: number;
  stopPrice?: number;
  status: "pending" | "filled" | "cancelled" | "rejected";
  filledQuantity: number;
  averageFillPrice: number;
  fees: number;
  agentId?: string;
}

export interface Trade extends BaseEntity {
  orderId: string;
  symbol: string;
  side: "buy" | "sell";
  quantity: number;
  price: number;
  fees: number;
  totalValue: number;
  pnl?: number;
  pnlPercent?: number;
}
```

### Agent Types

```typescript
// types/agent.types.ts
export interface Agent extends BaseEntity {
  name: string;
  type: "financial_analyzer" | "trading_agent";
  status: "active" | "inactive" | "error";
  lastRun: string;
  config: AgentConfig;
  performance: AgentPerformance;
}

export interface AgentRecommendation extends BaseEntity {
  agentId: string;
  symbol: string;
  action: "buy" | "sell" | "hold";
  confidence: number;
  reasoning: string;
  targetPrice?: number;
  stopLoss?: number;
  position_size?: number;
  priority: "low" | "medium" | "high";
}

export interface AgentConfig {
  riskTolerance: number;
  maxPositionSize: number;
  sectors: string[];
  tradingHours: {
    start: string;
    end: string;
  };
  analysisFrequency: number;
}
```

## Reusable Components Architecture

### Base Components

```typescript
// components/common/Button/Button.types.ts
export interface ButtonProps {
  variant: "primary" | "secondary" | "danger" | "success";
  size: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

// components/common/Button/Button.tsx
export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  children,
  icon,
  type = "button",
}) => {
  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type}
      className={`btn btn--${variant} btn--${size} ${
        fullWidth ? "btn--full" : ""
      }`}
      disabled={disabled || loading}
      onClick={handleClick}
    >
      {loading && <LoadingSpinner size="small" />}
      {icon && !loading && <span className="btn__icon">{icon}</span>}
      <span className="btn__text">{children}</span>
    </button>
  );
};
```

### Chart Components

```typescript
// components/common/Chart/Chart.types.ts
export interface ChartDataPoint {
  x: string | number;
  y: number;
  label?: string;
}

export interface ChartProps {
  data: ChartDataPoint[];
  type: "line" | "bar" | "pie" | "area";
  height?: number;
  width?: number;
  color?: string;
  title?: string;
  xLabel?: string;
  yLabel?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  animate?: boolean;
}

// components/common/Chart/LineChart.tsx
export const LineChart: React.FC<ChartProps> = ({
  data,
  height = 300,
  width = 600,
  color = "#3B82F6",
  title,
  showGrid = true,
  animate = true,
}) => {
  const chartConfig = {
    responsive: true,
    maintainAspectRatio: false,
    animation: animate,
    scales: {
      x: { grid: { display: showGrid } },
      y: { grid: { display: showGrid } },
    },
  };

  return (
    <div className="chart-container" style={{ height, width }}>
      {title && <h3 className="chart-title">{title}</h3>}
      <Line data={formatChartData(data, color)} options={chartConfig} />
    </div>
  );
};
```

## Feature Components

### Portfolio Summary Component

```typescript
// components/features/dashboard/PortfolioSummary/PortfolioSummary.tsx
export const PortfolioSummary: React.FC = () => {
  const { portfolio, loading, error } = usePortfolio();
  const theme = useTheme();

  if (loading) return <LoadingCard />;
  if (error) return <ErrorCard message={error} />;
  if (!portfolio) return <EmptyState message="No portfolio data available" />;

  return (
    <Card className="portfolio-summary">
      <CardHeader>
        <h2>Portfolio Summary</h2>
        <RefreshButton onClick={() => window.location.reload()} />
      </CardHeader>

      <CardContent>
        <div className="metrics-grid">
          <MetricCard
            label="Total Value"
            value={formatCurrency(portfolio.totalValue)}
            change={portfolio.totalPnL}
            changePercent={portfolio.totalPnLPercent}
          />
          <MetricCard
            label="Day P&L"
            value={formatCurrency(portfolio.dayPnL)}
            change={portfolio.dayPnL}
            changePercent={portfolio.dayPnLPercent}
          />
          <MetricCard
            label="Cash Balance"
            value={formatCurrency(portfolio.cashBalance)}
          />
          <MetricCard
            label="Positions"
            value={portfolio.positions.length.toString()}
          />
        </div>

        <div className="allocation-section">
          <AllocationChart data={portfolio.allocation} />
        </div>
      </CardContent>
    </Card>
  );
};
```

### Agent Status Component

```typescript
// components/features/agents/AgentStatus/AgentStatus.tsx
export const AgentStatus: React.FC = () => {
  const { agents, loading } = useAgents();
  const { recommendations } = useAgentRecommendations();

  return (
    <Card className="agent-status">
      <CardHeader>
        <h2>Agent Status</h2>
        <StatusIndicator status={getOverallAgentStatus(agents)} />
      </CardHeader>

      <CardContent>
        <div className="agents-list">
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              recommendations={recommendations.filter(
                (r) => r.agentId === agent.id
              )}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const AgentCard: React.FC<{
  agent: Agent;
  recommendations: AgentRecommendation[];
}> = ({ agent, recommendations }) => (
  <div className="agent-card">
    <div className="agent-header">
      <h3>{agent.name}</h3>
      <StatusBadge status={agent.status} />
    </div>

    <div className="agent-metrics">
      <span>Last Run: {formatTimeAgo(agent.lastRun)}</span>
      <span>Recommendations: {recommendations.length}</span>
    </div>

    {recommendations.length > 0 && (
      <div className="recent-recommendations">
        <h4>Recent Recommendations</h4>
        {recommendations.slice(0, 3).map((rec) => (
          <RecommendationItem key={rec.id} recommendation={rec} />
        ))}
      </div>
    )}
  </div>
);
```

## State Management (Redux Toolkit)

### Store Configuration

```typescript
// store/index.ts
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    portfolio: portfolioSlice.reducer,
    trading: tradingSlice.reducer,
    agents: agentSlice.reducer,
    ui: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});
```

### Portfolio Slice

```typescript
// store/portfolioSlice.ts
interface PortfolioState {
  portfolio: Portfolio | null;
  positions: Position[];
  performance: PerformanceData[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    setPortfolio: (state, action) => {
      state.portfolio = action.payload;
      state.lastUpdated = new Date().toISOString();
    },
    updatePosition: (state, action) => {
      const { symbol, data } = action.payload;
      const index = state.positions.findIndex((p) => p.symbol === symbol);
      if (index !== -1) {
        state.positions[index] = { ...state.positions[index], ...data };
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});
```

## Custom Hooks

### Portfolio Hook

```typescript
// hooks/usePortfolio.ts
export const usePortfolio = () => {
  const dispatch = useAppDispatch();
  const { portfolio, positions, loading, error } = useAppSelector(
    (state) => state.portfolio
  );

  const fetchPortfolio = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const data = await portfolioApi.getPortfolio();
      dispatch(setPortfolio(data));
    } catch (err) {
      dispatch(setError(err.message));
    }
  }, [dispatch]);

  const refreshPosition = useCallback(
    async (symbol: string) => {
      try {
        const position = await portfolioApi.getPosition(symbol);
        dispatch(updatePosition({ symbol, data: position }));
      } catch (err) {
        console.error(`Failed to refresh position for ${symbol}:`, err);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  return {
    portfolio,
    positions,
    loading,
    error,
    fetchPortfolio,
    refreshPosition,
  };
};
```

### WebSocket Hook

```typescript
// hooks/useWebSocket.ts
export const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<any>(null);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      setIsConnected(true);
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLastMessage(data);
    };

    ws.onclose = () => {
      setIsConnected(false);
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, [url]);

  const sendMessage = useCallback(
    (message: any) => {
      if (socket && isConnected) {
        socket.send(JSON.stringify(message));
      }
    },
    [socket, isConnected]
  );

  return { isConnected, lastMessage, sendMessage };
};
```

## Routing Structure

```typescript
// router.tsx
export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="trading" element={<TradingPage />} />
          <Route path="agents" element={<AgentsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
```

## Styling Strategy

### CSS Custom Properties

```css
/* styles/variables.css */
:root {
  /* Colors */
  --color-primary: #3b82f6;
  --color-secondary: #6b7280;
  --color-success: #10b981;
  --color-danger: #ef4444;
  --color-warning: #f59e0b;

  /* Backgrounds */
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --bg-tertiary: #f3f4f6;

  /* Text */
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --text-tertiary: #9ca3af;

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  /* Borders */
  --border-radius: 0.5rem;
  --border-color: #e5e7eb;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

This frontend design emphasizes:

- **Separation of Concerns**: Clear separation between components, hooks, services, and state management
- **Reusability**: Modular components with consistent APIs
- **Type Safety**: Comprehensive TypeScript interfaces
- **Performance**: Optimized re-renders with proper memoization
- **Maintainability**: Clear folder structure and naming conventions
- **Real-time Updates**: WebSocket integration for live data
- **Error Handling**: Comprehensive error boundaries and loading states
