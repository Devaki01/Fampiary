import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { LogIn } from 'lucide-react';

// ─── Inject all styles into <head> once ──────────────────────────
// Includes both login-screen styles AND profile-screen styles so
// every screen that uses these class names works without a CSS file.

const STYLE_ID = 'login-screen-styles';

const CSS = `
/* ── Login Screen ─────────────────────────────────────────────── */

.login-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 35%, #fef9ee 70%, #fff7ed 100%);
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  position: relative;
  overflow: hidden;
}

.login-screen::before {
  content: '';
  position: absolute;
  top: -120px; right: -80px;
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(251,191,36,0.22) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.login-screen::after {
  content: '';
  position: absolute;
  bottom: -100px; left: -60px;
  width: 320px; height: 320px;
  background: radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.login-card {
  width: 100%;
  max-width: 400px;
  position: relative;
  z-index: 1;
}

.glass {
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 24px;
  box-shadow: 0 8px 40px rgba(180,120,0,0.10), 0 1.5px 6px rgba(0,0,0,0.06);
  padding: 40px 32px 32px;
}

.animate-fade-in {
  animation: login-fade-in 0.4s ease;
}

@keyframes login-fade-in {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.logo-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  border-radius: 16px;
  margin-bottom: 14px;
  box-shadow: 0 4px 16px rgba(245,158,11,0.35);
}

.hexagon-shape {
  width: 28px;
  height: 28px;
  background: #fff;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}

.login-header h1 {
  font-size: 28px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 6px;
  letter-spacing: -0.5px;
}

.login-header p {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  letter-spacing: 0.2px;
}

.user-input {
  padding: 11px 14px;
  border: 1.5px solid rgba(0,0,0,0.10);
  border-radius: 10px;
  font-size: 14px;
  color: #111827;
  background: rgba(255,255,255,0.8);
  outline: none;
  font-family: inherit;
  transition: border-color 0.15s, box-shadow 0.15s;
  box-sizing: border-box;
  width: 100%;
}

.user-input::placeholder { color: #9ca3af; font-size: 13px; }

.user-input:focus {
  border-color: #f59e0b;
  box-shadow: 0 0 0 3px rgba(245,158,11,0.12);
  background: #fff;
}

.error-message {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
}

.login-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 13px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(245,158,11,0.3);
  transition: transform 0.12s, box-shadow 0.12s, filter 0.12s;
  margin-top: 4px;
  letter-spacing: 0.2px;
  font-family: inherit;
}

.login-button:hover {
  filter: brightness(1.05);
  box-shadow: 0 6px 22px rgba(245,158,11,0.38);
  transform: translateY(-1px);
}

.login-button:active { transform: scale(0.98); }

.button-icon { flex-shrink: 0; }

/* ── Profile Screen ────────────────────────────────────────────── */

.profile-screen {
  padding: 24px;
  min-height: 100%;
}

.profile-card {
  padding: 32px;
  border-radius: 16px;
  background: var(--surface);
  margin-bottom: 24px;
  box-shadow: var(--shadow-sm);
}

.profile-header-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
}

.profile-avatar-large {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--primary);
  margin-bottom: 16px;
}

.profile-header-section h3 {
  font-size: 1.5rem;
  color: var(--text-dark);
  margin-bottom: 8px;
}

.name-input {
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 8px;
  width: 100%;
  max-width: 300px;
}

.branch-badge {
  background: var(--bg-color);
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 0.875rem;
  color: var(--text-muted);
  border: 1px solid var(--border-color);
}

.profile-details-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 32px;
}

.detail-row {
  display: flex;
  align-items: flex-start;
}

.row-icon {
  width: 24px;
  height: 24px;
  color: var(--primary);
  margin-right: 16px;
  margin-top: 4px;
}

.row-content {
  flex: 1;
}

.row-content label {
  display: block;
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}

.row-content span {
  font-size: 1rem;
  color: var(--text-dark);
}

.edit-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  background: var(--bg-color);
  box-sizing: border-box;
}

.edit-input:focus {
  border-color: var(--primary);
}

.profile-actions {
  display: flex;
  justify-content: center;
}

.action-button {
  display: flex;
  align-items: center;
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: pointer;
  font-family: inherit;
  font-size: 1rem;
  border: none;
}

.edit-button {
  background: var(--bg-color);
  color: var(--text-dark);
  border: 1px solid var(--border-color);
}

.edit-button:hover {
  background: var(--border-color);
}

.save-button {
  background: var(--primary);
  color: white;
}

.save-button:hover {
  background: var(--primary-dark);
}

/* Privacy Card */
.privacy-card {
  padding: 24px;
  border-radius: 12px;
  background: var(--surface);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: var(--shadow-sm);
}

.privacy-header {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.privacy-icon {
  width: 20px;
  height: 20px;
  color: var(--text-dark);
  margin-right: 8px;
}

.privacy-header h3 {
  font-size: 1.125rem;
}

.privacy-info p {
  font-size: 0.875rem;
  color: var(--text-muted);
}

.toggle-button {
  width: 52px;
  height: 32px;
  background: var(--border-color);
  border-radius: 9999px;
  position: relative;
  transition: background 0.3s ease;
  margin-left: 16px;
  flex-shrink: 0;
  border: none;
  cursor: pointer;
}

.toggle-button.active {
  background: var(--primary);
}

.toggle-thumb {
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 4px;
  left: 4px;
  transition: transform 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.toggle-button.active .toggle-thumb {
  transform: translateX(20px);
}

.logout-section {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}

.logout-button {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
  width: 100%;
}

.logout-button:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.4);
}
`;

function useInjectStyles() {
  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = CSS;
    document.head.appendChild(el);
    return () => {
      document.getElementById(STYLE_ID)?.remove();
    };
  }, []);
}

// ─── Component ────────────────────────────────────────────────────

interface LoginScreenProps {
  onSwitchToSignUp: () => void;
}

export default function LoginScreen({ onSwitchToSignUp }: LoginScreenProps) {
  useInjectStyles();

  const { login, members } = useStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const normalizeName = (name: string) =>
    name.toLowerCase().replace(/[^a-z]+/g, ' ').trim().replace(/\s+/g, '.');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const member = members.find(
      m => normalizeName(m.name) === username.toLowerCase().trim(),
    );

    if (member && password === 'password') {
      login(member.id);
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-screen">
      <div className="login-card glass animate-fade-in">
        <div className="login-header">
          <div className="logo-icon">
            <div className="hexagon-shape" />
          </div>
          <h1>Fampiary</h1>
          <p>Your family hive awaits</p>
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

        <p style={{ textAlign: 'center', fontSize: 13, color: '#6b7280', margin: '16px 0 0' }}>
          New to Fampiary?{' '}
          <button
            type="button"
            onClick={onSwitchToSignUp}
            style={{ background: 'none', border: 'none', color: '#d97706', fontWeight: 700, fontSize: 13, cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}
          >
            Create an account →
          </button>
        </p>
      </div>
    </div>
  );
}