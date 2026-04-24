import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { LogIn } from 'lucide-react';
import { passwordStore } from './usePasswordStore';
import '../screens/LoginScreen';

interface Props {
  onSwitchToSignUp: () => void;
}

export default function LoginScreen({ onSwitchToSignUp }: Props) {
  const { login, members } = useStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const normalizeName = (name: string) => {
    return name.toLowerCase().replace(/[^a-z]+/g, ' ').trim().replace(/\s+/g, '.');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const member = members.find(
      m => normalizeName(m.name) === username.toLowerCase().trim(),
    );

    if (!member) {
      setError('No member found with that username.');
      return;
    }

    if (!passwordStore.verify(member.id, password)) {
      setError('Incorrect password.');
      return;
    }

    login(member.id);
  };

  return (
    <div className="login-screen">
      <div className="login-card glass animate-fade-in">
        <div className="login-header">
          <div className="logo-icon">
            <div className="hexagon-shape"></div>
          </div>
          <h1>Fampiary</h1>
          <p>Your family hive awaits</p>
        </div>

        {/* Login / Sign Up tabs */}
        <div className="auth-tabs-login">
          <button className="auth-tab-login active">Login</button>
          <button className="auth-tab-login" onClick={onSwitchToSignUp}>Sign Up</button>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="user-input"
              placeholder="firstname.lastname"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="user-input"
              placeholder="password"
              required
            />
          </div>

          <button type="submit" className="login-button">
            <LogIn className="button-icon" size={20} />
            <span>Enter Hive</span>
          </button>
        </form>

        {/* Switch to sign up */}
        <p className="login-switch-hint">
          New to Fampiary?{' '}
          <button type="button" className="login-switch-btn" onClick={onSwitchToSignUp}>
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
}