import React, { useState, useEffect } from 'react';
import { useCustomer } from '../context/CustomerContext';

interface AuthModalProps {
  onSuccess: () => void;
}

export function AuthModal({ onSuccess }: AuthModalProps) {
  const { isAuthOpen, closeAuth, login, register, customer, loading } = useCustomer();
  const [view, setView] = useState<'login' | 'register'>('login');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  // If already logged in when modal opens, just redirect to profile
  useEffect(() => {
    if (customer && isAuthOpen) {
      closeAuth();
      onSuccess();
    }
  }, [customer, isAuthOpen, closeAuth, onSuccess]);

  if (!isAuthOpen || customer) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Strict Password Validation
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    try {
      if (view === 'login') {
        await login(email, password);
      } else {
        await register(email, password, firstName, lastName);
      }
      closeAuth();
      onSuccess(); // Open Profile Page
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setError('');
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(36, 34, 32, 0.4)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
      onClick={closeAuth}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '480px',
          backgroundColor: '#fbf9f4',
          border: '1px solid #242220',
          padding: '3rem',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={closeAuth}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'none',
            border: 'none',
            fontFamily: 'var(--font-mono)',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#242220'
          }}
        >
          ×
        </button>

        <div style={{ textAlign: 'center' }}>
          <span style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '10px', 
            letterSpacing: '0.2em',
            color: '#736558',
            textTransform: 'uppercase'
          }}>
            {view === 'login' ? 'Welcome Back' : 'Create Account'}
          </span>
          <h2 style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: '2rem', 
            color: '#242220',
            marginTop: '1rem',
            marginBottom: '2rem'
          }}>
            {view === 'login' ? 'Sign In' : 'Sign Up'}
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
            {view === 'register' && (
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input type="text" placeholder="First Name" required value={firstName} onChange={e => setFirstName(e.target.value)} style={inputStyle} />
                <input type="text" placeholder="Last Name" required value={lastName} onChange={e => setLastName(e.target.value)} style={inputStyle} />
              </div>
            )}
            <input type="email" placeholder="Email Address" required value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
            <input type="password" placeholder="Password (Min 8 characters)" required value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} />
            
            {error && <div style={{ color: '#c0392b', fontFamily: 'var(--font-mono)', fontSize: '10px', marginTop: '0.5rem' }}>{error}</div>}

            <button 
              type="submit" 
              disabled={loading}
              style={{
                width: '100%',
                padding: '1.2rem',
                backgroundColor: '#242220',
                color: '#f7f2e9',
                border: 'none',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: '1rem',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'PROCESSING...' : (view === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT')}
            </button>
          </form>

          <button 
            onClick={() => {
              setView(view === 'login' ? 'register' : 'login');
              resetForm();
            }}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.1em',
              color: '#736558',
              marginTop: '2rem',
              cursor: 'pointer',
              textTransform: 'uppercase',
              textDecoration: 'underline'
            }}
          >
            {view === 'login' ? 'New here? Create an account' : 'Already have an account? Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '1rem',
  fontFamily: 'var(--font-mono)',
  fontSize: '12px',
  backgroundColor: 'transparent',
  border: '1px solid #242220',
  color: '#242220',
  outline: 'none',
  boxSizing: 'border-box'
};
