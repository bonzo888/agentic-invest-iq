import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Portfolio, Position } from '../types/portfolio.types';

interface PortfolioState {
  portfolio: Portfolio | null;
  positions: Position[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

const initialState: PortfolioState = {
  portfolio: null,
  positions: [],
  loading: false,
  error: null,
  lastUpdated: null,
};

// Dummy portfolio data
const DUMMY_POSITIONS: Position[] = [
  {
    id: '1',
    symbol: 'AAPL',
    quantity: 100,
    averageCost: 150.00,
    currentPrice: 175.50,
    marketValue: 17550,
    unrealizedPnL: 2550,
    unrealizedPnLPercent: 17.0,
    sector: 'Technology',
    assetType: 'stock',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    symbol: 'GOOGL',
    quantity: 50,
    averageCost: 120.00,
    currentPrice: 140.25,
    marketValue: 7012.50,
    unrealizedPnL: 1012.50,
    unrealizedPnLPercent: 16.9,
    sector: 'Technology',
    assetType: 'stock',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    symbol: 'SPY',
    quantity: 25,
    averageCost: 400.00,
    currentPrice: 420.75,
    marketValue: 10518.75,
    unrealizedPnL: 518.75,
    unrealizedPnLPercent: 5.2,
    sector: 'ETF',
    assetType: 'etf',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

const DUMMY_PORTFOLIO: Portfolio = {
  id: '1',
  userId: '1',
  totalValue: 45081.25,
  totalCost: 41000.00,
  totalPnL: 4081.25,
  totalPnLPercent: 9.95,
  dayPnL: 325.50,
  dayPnLPercent: 0.73,
  cashBalance: 10000.00,
  positions: DUMMY_POSITIONS,
  allocation: [
    { category: 'Technology', value: 24562.50, percentage: 54.5, color: '#3B82F6' },
    { category: 'ETF', value: 10518.75, percentage: 23.3, color: '#10B981' },
    { category: 'Cash', value: 10000.00, percentage: 22.2, color: '#6B7280' },
  ],
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};

// Async thunk to fetch portfolio
export const fetchPortfolio = createAsyncThunk(
  'portfolio/fetchPortfolio',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      return DUMMY_PORTFOLIO;
    } catch (error) {
      return rejectWithValue('Failed to fetch portfolio');
    }
  }
);

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    updatePosition: (state, action: PayloadAction<{ symbol: string; data: Partial<Position> }>) => {
      const { symbol, data } = action.payload;
      const index = state.positions.findIndex((p) => p.symbol === symbol);
      if (index !== -1) {
        state.positions[index] = { ...state.positions[index], ...data };
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortfolio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPortfolio.fulfilled, (state, action) => {
        state.portfolio = action.payload;
        state.positions = action.payload.positions;
        state.loading = false;
        state.error = null;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchPortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setLoading, setError, updatePosition, clearError } = portfolioSlice.actions;
export default portfolioSlice.reducer;