import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, TrendingUp } from 'lucide-react';
import { useAuth } from '../../../../hooks/useAuth';
import { Input } from '../../../common/Input';
import { Button } from '../../../common/Button';
import './LoginForm.css';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: 'demo@investiq.com',
    password: 'password123',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(formData);
      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <TrendingUp className="logo-icon" />
            <span className="logo-text">InvestIQ</span>
          </div>
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to your investment dashboard</p>
        </div>

        <div className="login-demo-info">
          <h3>Demo Credentials</h3>
          <p><strong>Email:</strong> demo@investiq.com</p>
          <p><strong>Password:</strong> password123</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <Input
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange('email')}
            startIcon={<Mail size={16} />}
            required
            fullWidth
            autoComplete="email"
          />

          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange('password')}
            startIcon={<Lock size={16} />}
            required
            fullWidth
            autoComplete="current-password"
          />

          <Button
            type="submit"
            variant="primary"
            size="large"
            fullWidth
            loading={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <div className="login-footer">
          <p>Demo mode - No real trading or financial data</p>
        </div>
      </div>
    </div>
  );
};