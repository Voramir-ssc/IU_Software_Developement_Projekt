import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Header-Komponente
 * Zeigt das Anwendungslogo, Navigationslinks und eine kurze Profilinfo des angemeldeten Benutzers.
 * Diese Komponente ist zustandslos und dient ausschliesslich der Darstellung (Presentational Component).
 */
export const Header: React.FC = () => {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: '#fff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <div className="logo-icon">FH</div>
        <span style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--primary)' }}>Familien Hero</span>
      </div>

      <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <NavLink 
          to="/" 
          style={({ isActive }) => ({ textDecoration: 'none', fontWeight: 600, color: isActive ? 'var(--accent)' : 'var(--primary)', borderBottom: isActive ? '2px solid var(--accent)' : 'none', padding: '0.5rem 0' })}
        >
          Dashboard
        </NavLink>
        <NavLink 
          to="/create" 
          style={({ isActive }) => ({ textDecoration: 'none', fontWeight: 600, color: isActive ? 'var(--accent)' : 'var(--primary)', borderBottom: isActive ? '2px solid var(--accent)' : 'none', padding: '0.5rem 0' })}
        >
          Neue Aufgabe
        </NavLink>
      </nav>

      <div className="user-profile" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <span>Hallo, <strong>Stefan</strong> 👋</span>
      </div>
    </header>
  );
};
