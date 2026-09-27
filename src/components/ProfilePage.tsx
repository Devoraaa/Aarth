import React from 'react';
import { useCustomer } from '../context/CustomerContext';

interface ProfilePageProps {
  onBack: () => void;
}

export function ProfilePage({ onBack }: ProfilePageProps) {
  const { customer, logout } = useCustomer();

  if (!customer) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: '100px', textAlign: 'center' }}>
        <p>You are not signed in.</p>
        <button onClick={onBack} style={{ marginTop: '1rem', padding: '10px 20px', border: '1px solid #242220', background: 'transparent' }}>Return to Home</button>
      </div>
    );
  }

  const handleSignOut = () => {
    logout();
    onBack();
  };

  return (
    <div className="profile-page-container" style={{ 
      minHeight: '100vh', 
      paddingTop: '80px', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: '#f7f2e9',
      color: '#242220'
    }}>
      <div style={{ padding: '2rem 4rem', marginBottom: '1rem' }}>
        <button 
          onClick={onBack}
          className="back-btn"
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            fontFamily: 'var(--font-mono)', 
            fontSize: '11px',
            letterSpacing: '0.12em',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            padding: '10px 0',
            borderBottom: '1px solid currentColor',
            textTransform: 'uppercase',
            color: '#242220'
          }}
        >
          <span>←</span>
          <span>RETURN TO STORE</span>
        </button>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', padding: '0 2rem 4rem' }}>
        <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', fontWeight: 400, marginBottom: '0.5rem' }}>
            My Account
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#736558', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Welcome back, {customer.firstName} {customer.lastName}
          </p>
          <button 
            onClick={handleSignOut}
            style={{
              marginTop: '1.5rem',
              background: 'none',
              border: 'none',
              textDecoration: 'underline',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              cursor: 'pointer',
              color: '#242220'
            }}
          >
            Sign Out
          </button>
        </header>

        <section>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', borderBottom: '1px solid #242220', paddingBottom: '1rem', marginBottom: '2rem' }}>
            Order History
          </h2>
          
          {customer.orders?.edges?.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {customer.orders.edges.map(({ node }: any) => (
                <div key={node.orderNumber} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '1.5rem', 
                  border: '1px solid rgba(36,34,32,0.1)',
                  backgroundColor: '#fbf9f4'
                }}>
                  <div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 600, marginBottom: '0.5rem' }}>
                      Order #{node.orderNumber}
                    </p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#736558' }}>
                      {new Date(node.processedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 600 }}>
                      {node.totalPrice.currencyCode} {node.totalPrice.amount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: '#fbf9f4', border: '1px solid rgba(36,34,32,0.1)' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#736558', marginBottom: '1.5rem' }}>
                You haven't placed any orders yet.
              </p>
              <button 
                onClick={onBack}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#242220',
                  color: '#f7f2e9',
                  border: 'none',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer'
                }}
              >
                Continue Shopping
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}


