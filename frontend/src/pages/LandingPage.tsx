import React from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, Bot, PieChart, Shield, BarChart3, Users, ArrowRight, Sparkles } from 'lucide-react'
import '../styles/LandingPage.css'

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page" style={{ background: '#ff0000', minHeight: '100vh', padding: '20px' }}>
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="landing-nav__container">
          <div className="landing-nav__content">
            <Link to="/" className="landing-nav__brand">
              <TrendingUp className="landing-nav__logo" size={32} />
              <h1 className="landing-nav__logo-text">InvestIQ</h1>
            </Link>
            <div className="landing-nav__links">
              <a href="#features" className="landing-nav__link">Features</a>
              <a href="#about" className="landing-nav__link">About</a>
              <Link to="/login" className="landing-nav__cta">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="landing-hero">
        <h1 className="landing-hero__title">
          Smart Investment <br />
          <span className="landing-hero__title-highlight">Powered by AI</span>
        </h1>
        <p className="landing-hero__subtitle">
          Manage your portfolio with AI-powered insights, real-time analytics, and intelligent trading agents.
          Make smarter investment decisions with comprehensive market data and automated recommendations.
        </p>
        <div className="landing-hero__cta">
          <Link to="/login" className="landing-hero__button landing-hero__button--primary">
            <Sparkles size={20} />
            Start Investing
          </Link>
          <Link to="/login" className="landing-hero__button landing-hero__button--secondary">
            Live Demo
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="landing-features">
        <div className="landing-features__container">
          <div className="landing-features__header">
            <h2 className="landing-features__title">
              Everything you need to manage your investments
            </h2>
            <p className="landing-features__description">
              Professional-grade tools powered by artificial intelligence
            </p>
          </div>

          <div className="landing-features__grid">
            {/* Feature 1 */}
            <div className="landing-feature">
              <div className="landing-feature__icon-wrapper">
                <PieChart className="landing-feature__icon" size={24} />
              </div>
              <h3 className="landing-feature__title">Portfolio Analytics</h3>
              <p className="landing-feature__description">
                Comprehensive portfolio tracking with real-time P&L, allocation charts, and performance metrics.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="landing-feature">
              <div className="landing-feature__icon-wrapper">
                <Bot className="landing-feature__icon" size={24} />
              </div>
              <h3 className="landing-feature__title">AI Trading Agents</h3>
              <p className="landing-feature__description">
                Intelligent agents that analyze markets and provide actionable trading recommendations.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="landing-feature">
              <div className="landing-feature__icon-wrapper">
                <BarChart3 className="landing-feature__icon" size={24} />
              </div>
              <h3 className="landing-feature__title">Real-time Data</h3>
              <p className="landing-feature__description">
                Live market data, price alerts, and instant portfolio updates via WebSocket connections.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="landing-feature">
              <div className="landing-feature__icon-wrapper">
                <Shield className="landing-feature__icon" size={24} />
              </div>
              <h3 className="landing-feature__title">Risk Management</h3>
              <p className="landing-feature__description">
                Advanced risk metrics, stop-loss automation, and position sizing recommendations.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="landing-feature">
              <div className="landing-feature__icon-wrapper">
                <TrendingUp className="landing-feature__icon" size={24} />
              </div>
              <h3 className="landing-feature__title">Trading Panel</h3>
              <p className="landing-feature__description">
                Professional trading interface with order management, watchlists, and execution tools.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="landing-feature">
              <div className="landing-feature__icon-wrapper">
                <Users className="landing-feature__icon" size={24} />
              </div>
              <h3 className="landing-feature__title">Multi-User Support</h3>
              <p className="landing-feature__description">
                Secure user authentication, personalized dashboards, and customizable settings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="landing-cta">
        <div className="landing-cta__container">
          <h2 className="landing-cta__title">
            Ready to optimize your portfolio?
          </h2>
          <p className="landing-cta__description">
            Join thousands of investors using AI-powered analytics to make better investment decisions.
          </p>
          <Link to="/login" className="landing-cta__button">
            Get Started Today
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer__container">
          <div className="landing-footer__brand">
            <TrendingUp className="landing-footer__logo" size={24} />
            <h2 className="landing-footer__logo-text">InvestIQ</h2>
          </div>
          <p className="landing-footer__copyright">
            © 2024 InvestIQ. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage