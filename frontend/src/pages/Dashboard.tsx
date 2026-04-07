import { useEffect, useState } from 'react';
import { Star, Trophy, Activity } from 'lucide-react';
import { API_BASE_URL } from '../config';
import { useUser } from '../context/UserContext';

interface Task {
  _id: string;
  title: string;
  status: 'open' | 'done';
}

const Dashboard = () => {
  const { currentUser, users } = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [apiStatus, setApiStatus] = useState<string>('Verbinde...');

  useEffect(() => {
    // Verbindungsprüfung zum Backend
    fetch(`${API_BASE_URL}/health`)
      .then(res => res.json())
      .then(data => setApiStatus(data.message))
      .catch(() => setApiStatus('Backend Offline'));

    // Aktuelle Aufgaben laden
    fetch(`${API_BASE_URL}/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(() => {});
  }, []);

  if (!currentUser) return null;

  const marlene = users.find(u => u.name === 'Marlene');
  const marlenePoints = marlene?.points || 480; // Fallback from Seed

  return (
    <div className="dashboard-page">
      <div className="stats-grid">
        <div className="card">
          <Activity size={24} className="card-icon" />
          <h3>Offene Aufgaben</h3>
          <div className="value">{tasks.filter(t => t.status === 'open').length}</div>
        </div>
        
        <div className="card marlene-special">
          <Star size={24} className="card-icon" fill="#f59e0b" color="#f59e0b" />
          <h3>Marlenes Super-Punkte</h3>
          <div className="value">{marlenePoints} ★</div>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${(marlenePoints / 600) * 100}%` }}></div>
          </div>
          <p className="progress-text">
            {marlenePoints < 600 ? `Noch ${600 - marlenePoints} bis zum LEGO Set!` : 'Ziel erreicht! 🧱'}
          </p>
        </div>

        <div className="card">
          <Trophy size={24} className="card-icon" color="var(--accent)" />
          <h3>API Status</h3>
          <div className="value status-text">{apiStatus}</div>
        </div>
      </div>

      <div className="family-section">
        <h2>Die Helden der Familie</h2>
        <div className="heroes-list">
          <div className="hero-card">
            <div className="hero-avatar">S</div>
            <div className="hero-info">
              <h4>Stefan</h4>
              <span>Vater & Admin</span>
            </div>
          </div>
          <div className="hero-card">
            <div className="hero-avatar" style={{background: '#ec4899'}}>A</div>
            <div className="hero-info">
              <h4>Alexandra</h4>
              <span>Mutter & Admin</span>
            </div>
          </div>
          <div className="hero-card">
            <div className="hero-avatar" style={{background: '#f59e0b'}}>M</div>
            <div className="hero-info">
              <h4>Marlene (8)</h4>
              <span>Kleine Heldin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
