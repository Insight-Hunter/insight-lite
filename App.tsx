import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Forecast from './pages/Forecast';
import Summary from './pages/Summary';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Layout from './components/Layout';
import './styles/globals.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    // Check authentication and onboarding status from localStorage
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    const onboardingStatus = localStorage.getItem('hasCompletedOnboarding') === 'true';
    setIsAuthenticated(authStatus);
    setHasCompletedOnboarding(onboardingStatus);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
    localStorage.setItem('hasCompletedOnboarding', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setHasCompletedOnboarding(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('hasCompletedOnboarding');
    localStorage.removeItem('businessInfo');
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to={hasCompletedOnboarding ? "/dashboard" : "/onboarding"} /> : <Login onLogin={handleLogin} />
        } />
        <Route path="/onboarding" element={
          !isAuthenticated ? <Navigate to="/login" /> : 
          hasCompletedOnboarding ? <Navigate to="/dashboard" /> :
          <Onboarding onComplete={handleOnboardingComplete} />
        } />
        <Route path="/" element={
          !isAuthenticated ? <Navigate to="/login" /> :
          !hasCompletedOnboarding ? <Navigate to="/onboarding" /> :
          <Layout onLogout={handleLogout}><Dashboard /></Layout>
        } />
        <Route path="/dashboard" element={
          !isAuthenticated ? <Navigate to="/login" /> :
          !hasCompletedOnboarding ? <Navigate to="/onboarding" /> :
          <Layout onLogout={handleLogout}><Dashboard /></Layout>
        } />
        <Route path="/forecast" element={
          !isAuthenticated ? <Navigate to="/login" /> :
          !hasCompletedOnboarding ? <Navigate to="/onboarding" /> :
          <Layout onLogout={handleLogout}><Forecast /></Layout>
        } />
        <Route path="/summary" element={
          !isAuthenticated ? <Navigate to="/login" /> :
          !hasCompletedOnboarding ? <Navigate to="/onboarding" /> :
          <Layout onLogout={handleLogout}><Summary /></Layout>
        } />
        <Route path="/reports" element={
          !isAuthenticated ? <Navigate to="/login" /> :
          !hasCompletedOnboarding ? <Navigate to="/onboarding" /> :
          <Layout onLogout={handleLogout}><Reports /></Layout>
        } />
        <Route path="/settings" element={
          !isAuthenticated ? <Navigate to="/login" /> :
          !hasCompletedOnboarding ? <Navigate to="/onboarding" /> :
          <Layout onLogout={handleLogout}><Settings /></Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
