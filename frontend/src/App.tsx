import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import LandingPage from './pages/LandingPage'
import { LoginForm } from './components/features/auth/LoginForm'
import { ProtectedRoute } from './components/features/auth/ProtectedRoute'
import { MainLayout } from './components/common/Layout/MainLayout'
import { Dashboard } from './pages/Dashboard'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginForm />} />
            
            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
            </Route>
            
            {/* Additional protected routes placeholders */}
            <Route
              path="/portfolio"
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<div>Portfolio Page Coming Soon</div>} />
            </Route>
            
            <Route
              path="/trading"
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<div>Trading Page Coming Soon</div>} />
            </Route>
            
            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<div>Analytics Page Coming Soon</div>} />
            </Route>
            
            <Route
              path="/agents"
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<div>Agents Page Coming Soon</div>} />
            </Route>
            
            <Route
              path="/transactions"
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<div>Transactions Page Coming Soon</div>} />
            </Route>
            
            <Route
              path="/performance"
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<div>Performance Page Coming Soon</div>} />
            </Route>
            
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<div>Settings Page Coming Soon</div>} />
            </Route>
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  )
}

export default App