import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { User, AuthState, LoginCredentials } from '../types/auth.types';

// Dummy credentials for demo
const DUMMY_CREDENTIALS = {
  email: 'demo@investiq.com',
  password: 'password123'
};

const DUMMY_USER: User = {
  id: '1',
  email: 'demo@investiq.com',
  firstName: 'Demo',
  lastName: 'User',
  profileImage: undefined,
  preferences: {
    theme: 'light' as const,
    currency: 'USD',
    timezone: 'America/New_York',
    notifications: {
      email: true,
      push: true,
      tradeExecutions: true,
      portfolioAlerts: true,
      agentRecommendations: true,
      marketNews: false,
    },
  },
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check dummy credentials
      if (
        credentials.email === DUMMY_CREDENTIALS.email &&
        credentials.password === DUMMY_CREDENTIALS.password
      ) {
        const authResponse = {
          user: DUMMY_USER,
          accessToken: 'dummy-access-token',
          refreshToken: 'dummy-refresh-token',
        };
        
        // Store in localStorage
        localStorage.setItem('accessToken', authResponse.accessToken);
        localStorage.setItem('refreshToken', authResponse.refreshToken);
        localStorage.setItem('user', JSON.stringify(authResponse.user));
        
        return authResponse;
      } else {
        return rejectWithValue('Invalid email or password');
      }
    } catch (error) {
      return rejectWithValue('Login failed');
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    // Clear localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }
);

// Async thunk to check existing session
export const checkAuthSession = createAsyncThunk(
  'auth/checkSession',
  async () => {
    const accessToken = localStorage.getItem('accessToken');
    const userStr = localStorage.getItem('user');
    
    if (accessToken && userStr) {
      try {
        const user = JSON.parse(userStr);
        return {
          user,
          accessToken,
          refreshToken: localStorage.getItem('refreshToken'),
        };
      } catch {
        // Clear invalid data
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        throw new Error('Invalid session data');
      }
    }
    
    throw new Error('No active session');
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: () => {
      // Clear any error states if needed
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isAuthenticated = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
      })
      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
      })
      // Check session cases
      .addCase(checkAuthSession.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
      })
      .addCase(checkAuthSession.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;