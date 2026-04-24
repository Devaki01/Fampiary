import React, { useState, useMemo, useEffect } from 'react';
import { UserPlus, Eye, EyeOff, ChevronDown, ChevronUp } from 'lucide-react';
import { useStore } from '../store/useStore';
import { BRANCHES, RELATION_TYPES } from '../data/mockData';
//import { passwordStore } from '.usePasswordStore';

// ─── Inject styles ────────────────────────────────────────────────

const STYLE_ID = 'signup-screen-styles';
const CSS = `
  .signup-screen {
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

  /* Decorative blobs */
  .signup-screen::before {
    content: '';
    position: absolute;
    top: -120px; right: -80px;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(251,191,36,0.22) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }
  .signup-screen::after {
    content: '';
    position: absolute;
    bottom: -100px; left: -60px;
    width: 320px; height: 320px;
    background: radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }

  /* Card */
  .signup-card {
    background: rgba(255,255,255,0.82);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.6);
    border-radius: 24px;
    box-shadow: 0 8px 40px rgba(180,120,0,0.10), 0 1.5px 6px rgba(0,0,0,0.06);
    padding: 36px 32px 28px;
    width: 100%;
    max-width: 480px;
    position: relative;
    z-index: 1;
    animation: su-fade-in 0.4s ease;
  }

  @keyframes su-fade-in {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Header */
  .signup-header {
    text-align: center;
    margin-bottom: 28px;
  }
  .signup-logo {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 52px; height: 52px;
    background: linear-gradient(135deg, #f59e0b, #d97706);
    border-radius: 14px;
    margin-bottom: 12px;
    box-shadow: 0 4px 16px rgba(245,158,11,0.35);
  }
  .signup-logo svg { color: #fff; }
  .signup-header h1 {
    font-size: 26px;
    font-weight: 800;
    color: #111827;
    margin: 0 0 4px;
    letter-spacing: -0.5px;
  }
  .signup-header p {
    font-size: 13px;
    color: #6b7280;
    margin: 0;
  }

  /* Mode switch tabs */
  .auth-tabs {
    display: flex;
    background: #f3f4f6;
    border-radius: 10px;
    padding: 3px;
    margin-bottom: 24px;
  }
  .auth-tab {
    flex: 1;
    padding: 8px;
    border: none;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    background: transparent;
    color: #6b7280;
    transition: all 0.18s;
  }
  .auth-tab.active {
    background: #fff;
    color: #d97706;
    box-shadow: 0 1px 4px rgba(0,0,0,0.10);
  }
  .auth-tab:hover:not(.active) { color: #374151; }

  /* Form */
  .signup-form { display: flex; flex-direction: column; gap: 14px; }

  .su-field {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .su-field label {
    font-size: 12px;
    font-weight: 600;
    color: #374151;
    letter-spacing: 0.2px;
  }
  .su-field label span.req { color: #f59e0b; margin-left: 2px; }

  .su-input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }
  .su-input {
    width: 100%;
    padding: 10px 14px;
    border: 1.5px solid rgba(0,0,0,0.10);
    border-radius: 10px;
    font-size: 14px;
    color: #111827;
    background: rgba(255,255,255,0.8);
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    font-family: inherit;
    box-sizing: border-box;
  }
  .su-input::placeholder { color: #9ca3af; font-size: 13px; }
  .su-input:focus {
    border-color: #f59e0b;
    box-shadow: 0 0 0 3px rgba(245,158,11,0.12);
    background: #fff;
  }
  .su-input.has-icon { padding-right: 42px; }
  .su-input.readonly {
    background: #fef3c7;
    color: #92400e;
    font-weight: 600;
    border-color: rgba(245,158,11,0.3);
    cursor: default;
  }

  /* Eye toggle */
  .su-eye-btn {
    position: absolute;
    right: 12px;
    background: none;
    border: none;
    cursor: pointer;
    color: #9ca3af;
    display: flex;
    align-items: center;
    padding: 0;
    transition: color 0.12s;
  }
  .su-eye-btn:hover { color: #374151; }

  /* Username hint */
  .su-username-hint {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: #6b7280;
    margin-top: -6px;
  }
  .su-username-pill {
    background: #fef3c7;
    color: #92400e;
    font-weight: 700;
    font-size: 11px;
    padding: 2px 8px;
    border-radius: 20px;
    border: 1px solid rgba(245,158,11,0.3);
  }

  /* Password strength */
  .su-strength-bar {
    display: flex;
    gap: 3px;
    margin-top: -6px;
  }
  .su-strength-bar span {
    flex: 1;
    height: 3px;
    border-radius: 2px;
    background: #e5e7eb;
    transition: background 0.2s;
  }
  .su-strength-bar span.weak   { background: #ef4444; }
  .su-strength-bar span.medium { background: #f59e0b; }
  .su-strength-bar span.strong { background: #10b981; }
  .su-strength-label {
    font-size: 11px;
    margin-top: -4px;
  }
  .su-strength-label.weak   { color: #ef4444; }
  .su-strength-label.medium { color: #f59e0b; }
  .su-strength-label.strong { color: #10b981; }

  /* Two-column row */
  .su-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  /* Optional section toggle */
  .su-optional-toggle {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 0 2px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
    color: #d97706;
    width: 100%;
    text-align: left;
  }
  .su-optional-toggle:hover { color: #b45309; }
  .su-optional-section {
    display: flex;
    flex-direction: column;
    gap: 14px;
    animation: su-expand 0.2s ease;
  }
  @keyframes su-expand {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Select */
  .su-select {
    width: 100%;
    padding: 10px 14px;
    border: 1.5px solid rgba(0,0,0,0.10);
    border-radius: 10px;
    font-size: 14px;
    color: #111827;
    background: rgba(255,255,255,0.8);
    outline: none;
    font-family: inherit;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 36px;
    cursor: pointer;
    transition: border-color 0.15s;
    box-sizing: border-box;
  }
  .su-select:focus { border-color: #f59e0b; box-shadow: 0 0 0 3px rgba(245,158,11,0.12); }

  /* Error */
  .su-error {
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #dc2626;
    padding: 10px 14px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  /* Submit button */
  .su-submit-btn {
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
    margin-top: 6px;
    letter-spacing: 0.2px;
  }
  .su-submit-btn:hover {
    filter: brightness(1.05);
    box-shadow: 0 6px 22px rgba(245,158,11,0.38);
    transform: translateY(-1px);
  }
  .su-submit-btn:active { transform: scale(0.98); }
  .su-submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    filter: none;
  }

  /* Switch link */
  .su-switch {
    text-align: center;
    font-size: 13px;
    color: #6b7280;
    margin-top: 8px;
  }
  .su-switch button {
    background: none;
    border: none;
    color: #d97706;
    font-weight: 700;
    font-size: 13px;
    cursor: pointer;
    padding: 0;
    margin-left: 4px;
    font-family: inherit;
  }
  .su-switch button:hover { color: #b45309; text-decoration: underline; }

  @media (max-width: 480px) {
    .signup-card { padding: 28px 18px 22px; }
    .su-row { grid-template-columns: 1fr; }
  }
`;

function useInjectStyles() {
  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = CSS;
    document.head.appendChild(el);
    return () => { document.getElementById(STYLE_ID)?.remove(); };
  }, []);
}

// ─── Helpers ──────────────────────────────────────────────────────

function normalizeName(name: string): string {
  return name.toLowerCase().replace(/[^a-z]+/g, ' ').trim().replace(/\s+/g, '.');
}

function generateId(): string {
  return 'u_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function passwordStrength(pw: string): 0 | 1 | 2 | 3 {
  if (pw.length === 0) return 0;
  let score = 0;
  if (pw.length >= 8)       score++;
  if (/[A-Z]/.test(pw))    score++;
  if (/[0-9!@#$%^&*]/.test(pw)) score++;
  return score as 0 | 1 | 2 | 3;
}

const STRENGTH_LABEL = ['', 'Weak', 'Medium', 'Strong'];
const STRENGTH_CLASS = ['', 'weak', 'medium', 'strong'];

// ─── Component ────────────────────────────────────────────────────

interface Props {
  onSwitchToLogin: () => void;
}

export default function SignUpScreen({ onSwitchToLogin }: Props) {
  useInjectStyles();

  const addMember  = useStore(s => (s as any).addMember as (m: any) => void);
  const login      = useStore(s => s.login);
  const members    = useStore(s => s.members);

  // Required fields
  const [fullName,   setFullName]   = useState('');
  const [password,   setPassword]   = useState('');
  const [confirmPw,  setConfirmPw]  = useState('');
  const [showPw,     setShowPw]     = useState(false);
  const [showCpw,    setShowCpw]    = useState(false);

  // Optional profile
  const [showOptional, setShowOptional] = useState(false);
  const [city,       setCity]       = useState('');
  const [phone,      setPhone]      = useState('');
  const [profession, setProfession] = useState('');
  const [relation,   setRelation]   = useState('Self');
  const [branch,     setBranch]     = useState('Paternal');

  const [error,  setError]  = useState('');

  // Auto-generate username from full name
  const username = useMemo(() => normalizeName(fullName), [fullName]);

  // Password strength
  const strength = passwordStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!fullName.trim()) { setError('Please enter your full name.'); return; }
    if (username.length < 3) { setError('Name must be at least 3 characters.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (password !== confirmPw) { setError('Passwords do not match.'); return; }

    // Check username uniqueness
    const taken = members.some(m => normalizeName(m.name) === username);
    if (taken) {
      setError('A member with this name already exists. Try logging in instead.');
      return;
    }

    // Create the new member
    const newId = generateId();
    const newMember = {
      id:         newId,
      name:       fullName.trim(),
      relation:   relation,
      city:       city.trim() || 'Unknown',
      phone:      phone.trim() || '',
      profession: profession.trim() || '',
      skills:     [],
      avatar:     `https://i.pravatar.cc/150?u=${newId}`,
      branch:     branch,
      generation: 0,
      isLocal:    true,
    };

    // Save password and add member
    passwordStore.set(newId, password);
    addMember(newMember);
    login(newId);
  };

  return (
    <div className="signup-screen">
      <div className="signup-card">

        {/* Header */}
        <div className="signup-header">
          <div className="signup-logo">
            <UserPlus size={24} />
          </div>
          <h1>Fampiary</h1>
          <p>Create your account and join the hive</p>
        </div>

        {/* Login / Sign Up tabs */}
        <div className="auth-tabs">
          <button className="auth-tab" onClick={onSwitchToLogin}>Login</button>
          <button className="auth-tab active">Sign Up</button>
        </div>

        <form onSubmit={handleSubmit} className="signup-form" noValidate>

          {error && (
            <div className="su-error">
              <span>⚠</span> {error}
            </div>
          )}

          {/* Full Name */}
          <div className="su-field">
            <label>Full Name <span className="req">*</span></label>
            <div className="su-input-wrap">
              <input
                className="su-input"
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                autoComplete="name"
                required
              />
            </div>
          </div>

          {/* Auto-generated username preview */}
          {username.length > 0 && (
            <div className="su-username-hint">
              Your username will be:
              <span className="su-username-pill">{username}</span>
            </div>
          )}

          {/* Password */}
          <div className="su-field">
            <label>Password <span className="req">*</span></label>
            <div className="su-input-wrap">
              <input
                className="su-input has-icon"
                type={showPw ? 'text' : 'password'}
                placeholder="Min. 6 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className="su-eye-btn"
                onClick={() => setShowPw(v => !v)}
                tabIndex={-1}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {/* Strength indicator */}
            {password.length > 0 && (
              <>
                <div className="su-strength-bar">
                  <span className={strength >= 1 ? STRENGTH_CLASS[strength] : ''} />
                  <span className={strength >= 2 ? STRENGTH_CLASS[strength] : ''} />
                  <span className={strength >= 3 ? STRENGTH_CLASS[strength] : ''} />
                </div>
                <span className={`su-strength-label ${STRENGTH_CLASS[strength]}`}>
                  {STRENGTH_LABEL[strength]}
                </span>
              </>
            )}
          </div>

          {/* Confirm Password */}
          <div className="su-field">
            <label>Confirm Password <span className="req">*</span></label>
            <div className="su-input-wrap">
              <input
                className="su-input has-icon"
                type={showCpw ? 'text' : 'password'}
                placeholder="Re-enter your password"
                value={confirmPw}
                onChange={e => setConfirmPw(e.target.value)}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className="su-eye-btn"
                onClick={() => setShowCpw(v => !v)}
                tabIndex={-1}
              >
                {showCpw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {confirmPw.length > 0 && password !== confirmPw && (
              <span style={{ fontSize: 11, color: '#ef4444' }}>Passwords don't match</span>
            )}
            {confirmPw.length > 0 && password === confirmPw && (
              <span style={{ fontSize: 11, color: '#10b981' }}>✓ Passwords match</span>
            )}
          </div>

          {/* Optional details toggle */}
          <button
            type="button"
            className="su-optional-toggle"
            onClick={() => setShowOptional(v => !v)}
          >
            {showOptional ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {showOptional ? 'Hide' : 'Add'} profile details (optional)
          </button>

          {showOptional && (
            <div className="su-optional-section">

              {/* City + Phone */}
              <div className="su-row">
                <div className="su-field">
                  <label>City</label>
                  <div className="su-input-wrap">
                    <input
                      className="su-input"
                      type="text"
                      placeholder="e.g. Pune"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                    />
                  </div>
                </div>
                <div className="su-field">
                  <label>Phone</label>
                  <div className="su-input-wrap">
                    <input
                      className="su-input"
                      type="tel"
                      placeholder="+91 ..."
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Profession */}
              <div className="su-field">
                <label>Profession</label>
                <div className="su-input-wrap">
                  <input
                    className="su-input"
                    type="text"
                    placeholder="e.g. Software Engineer"
                    value={profession}
                    onChange={e => setProfession(e.target.value)}
                  />
                </div>
              </div>

              {/* Relation + Branch */}
              <div className="su-row">
                <div className="su-field">
                  <label>Relation</label>
                  <select
                    className="su-select"
                    value={relation}
                    onChange={e => setRelation(e.target.value)}
                  >
                    {RELATION_TYPES.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div className="su-field">
                  <label>Branch</label>
                  <select
                    className="su-select"
                    value={branch}
                    onChange={e => setBranch(e.target.value)}
                  >
                    {BRANCHES.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="su-submit-btn"
            disabled={!fullName.trim() || password.length < 6 || password !== confirmPw}
          >
            <UserPlus size={18} />
            Join the Hive
          </button>

        </form>

        {/* Switch to login */}
        <div className="su-switch">
          Already have an account?
          <button type="button" onClick={onSwitchToLogin}>Login</button>
        </div>

      </div>
    </div>
  );
}