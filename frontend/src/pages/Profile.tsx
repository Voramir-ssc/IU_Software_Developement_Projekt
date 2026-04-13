import { useUser } from '../context/UserContext';
import { ShieldCheck, Baby, LogOut, CheckCircle2 } from 'lucide-react';

const Profile = () => {
  const { currentUser, users, setCurrentUser } = useUser();

  if (!currentUser) return <div className="glass">Lade Helden-Daten...</div>;

  return (
    <div className="profile-page">
      <div className="profile-hero card glass">
        <div className="hero-avatar-large">
          {currentUser.name.charAt(0)}
        </div>
        <div className="hero-details">
          <h2>{currentUser.name}</h2>
          <div className="role-badge">
            {currentUser.role === 'parent' ? <ShieldCheck size={16} /> : <Baby size={16} />}
            {currentUser.role === 'parent' ? 'Familien-Admin' : 'Kleiner Held'}
          </div>
        </div>
        <div className="points-display">
          <span className="pts">{currentUser.points}</span>
          <span className="label">Sterne</span>
        </div>
      </div>

      <div className="hero-switcher">
        <h3>Helden wechseln</h3>
        <p className="subtitle">Wer nutzt die App gerade?</p>
        
        <div className="switcher-grid">
          {users.map((u) => (
            <button
              key={u._id}
              className={`hero-select-card glass ${currentUser._id === u._id ? 'active' : ''}`}
              onClick={() => setCurrentUser(u)}
            >
              <div className="hero-select-avatar" style={{
                background: u.name === 'Marlene' ? '#ec4899' : u.name === 'Alexandra' ? '#f59e0b' : 'var(--primary)'
              }}>
                {u.name.charAt(0)}
              </div>
              <div className="hero-select-info">
                <h4>{u.name}</h4>
                <span>{u.role === 'parent' ? 'Eltern' : 'Kind'}</span>
              </div>
              {currentUser._id === u._id && <CheckCircle2 size={20} className="check-icon" />}
            </button>
          ))}
        </div>
      </div>

      <div className="profile-actions">
        <button className="card glass logout-btn" onClick={() => alert('Abmeldung: Diese Funktion ist in der aktuellen Demo-Version noch nicht aktiv.')}>
          <LogOut size={20} />
          <span>Abmelden</span>
        </button>
      </div>

      <style>{`
        .profile-page {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .profile-hero {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 2rem;
          text-align: left;
        }
        .hero-avatar-large {
          width: 80px;
          height: 80px;
          border-radius: 24px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          font-weight: 800;
          color: white;
          box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        }
        .hero-details h2 { margin: 0; font-size: 1.75rem; }
        .role-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,255,255,0.1);
          padding: 0.35rem 0.75rem;
          border-radius: 100px;
          font-size: 0.85rem;
          margin-top: 0.5rem;
          color: var(--text-muted);
        }
        .points-display {
          margin-left: auto;
          text-align: center;
          background: rgba(245, 158, 11, 0.1);
          padding: 1rem;
          border-radius: 20px;
          border: 1px solid rgba(245, 158, 11, 0.2);
        }
        .points-display .pts { display: block; font-size: 1.75rem; font-weight: 800; color: var(--accent); }
        .points-display .label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); }

        .hero-switcher h3 { margin-bottom: 0.25rem; font-size: 1.25rem; }
        .subtitle { color: var(--text-muted); margin-bottom: 1.5rem; font-size: 0.9rem; }
        
        .switcher-grid { display: flex; flex-direction: column; gap: 1rem; }
        .hero-select-card {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1rem;
          border: 1px solid var(--glass-border);
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
          background: var(--surface);
          border-radius: 20px;
          color: var(--text);
        }
        .hero-select-card:hover { background: var(--surface-hover); }
        .hero-select-card.active { border-color: var(--primary); background: rgba(99, 102, 241, 0.1); }
        
        .hero-select-avatar {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.25rem;
          color: white;
        }
        .hero-select-info h4 { margin: 0; font-size: 1.05rem; }
        .hero-select-info span { font-size: 0.8rem; color: var(--text-muted); }
        .check-icon { margin-left: auto; color: var(--primary); }

        .logout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1rem;
          color: #ef4444;
          background: rgba(239, 68, 68, 0.05);
          border-color: rgba(239, 68, 68, 0.2);
          cursor: pointer;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default Profile;
