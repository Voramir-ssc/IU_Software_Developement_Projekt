import React, { useEffect, useState } from 'react';

interface UserRef {
  _id: string;
  name: string;
}

interface Task {
  _id: string;
  title: string;
  assignedTo: UserRef;
  pointsReward: number;
  status: 'open' | 'done';
}

function App() {
  const [apiStatus, setApiStatus] = useState<string>('Connecting...');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [marlenePoints, setMarlenePoints] = useState<number>(0);

  const fetchData = async () => {
    // Health Check
    fetch('http://localhost:5000/api/health')
      .then(res => res.json())
      .then(data => setApiStatus(data.message))
      .catch(() => setApiStatus('Backend Offline'));

    // Fetch real tasks
    fetch('http://localhost:5000/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error('Error loading tasks:', err));

    // Fetch Marlene's Points
    fetch('http://localhost:5000/api/tasks/user/marlene-static-id/points') // Placeholder for real ID logic
      .then(res => res.json())
      .then(data => setMarlenePoints(data.points))
      .catch(() => {});

    // Better: Fetch all users and find the child for demo
    fetch('http://localhost:5000/api/health') // dummy health check already done
      .then(() => {
        // Since this is a demo/sprint, we fetch all tasks and their associated users
        fetch('http://localhost:5000/api/tasks')
          .then(res => res.json())
          .then(data => {
            const childTask = data.find((t: any) => t.assignedTo.role === 'child');
            if (childTask) {
              fetch(`http://localhost:5000/api/tasks/user/${childTask.assignedTo._id}/points`)
                .then(r => r.json())
                .then(d => setMarlenePoints(d.points));
            }
          });
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const completeTask = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}/done`, { method: 'PUT' });
      if (res.ok) {
        fetchData(); // Refresh list and points
      }
    } catch (err) {
      console.error('Error completing task:', err);
    }
  };

  return (
    <div className="app-container">
      <header>
        <div className="logo">
          <div className="logo-icon">FH</div>
          <span>Familien Hero</span>
        </div>
        <div className="user-profile">
          <span>Hallo, <strong>Stefan</strong> 👋</span>
        </div>
      </header>

      <div className="stats-grid">
        <div className="card">
          <h3>Offene Aufgaben</h3>
          <div className="value">{tasks.filter(t => t.status === 'open').length}</div>
        </div>
        <div className="card marlene-special">
          <h3>Marlenes Super-Punkte</h3>
          <div className="value">{marlenePoints} ★</div>
          <p style={{fontSize: '0.8rem', marginTop: '0.5rem'}}>
            {marlenePoints < 600 ? `Noch ${600 - marlenePoints} bis zum LEGO Set!` : 'Ziel erreicht! LEGO Zeit!'}
          </p>
        </div>
        <div className="card">
          <h3>API Status</h3>
          <div className="value" style={{fontSize: '1rem', color: apiStatus.includes('running') ? 'var(--accent)' : 'var(--secondary)'}}>
            {apiStatus}
          </div>
        </div>
      </div>

      <div className="family-section">
        <div className="tasks-container">
          <h2 style={{marginBottom: '1.5rem'}}>Anstehende Helden-Taten</h2>
          <div className="task-list">
            {tasks.map(task => (
              <div key={task._id} className="task-item" style={{opacity: task.status === 'done' ? 0.6 : 1}}>
                <div className="task-info">
                  <h4>{task.title}</h4>
                  <p>Zuständig: {task.assignedTo.name}</p>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                  <div className="points-badge">+{task.pointsReward} Pkt</div>
                  {task.status === 'open' && (
                    <button 
                      onClick={() => completeTask(task._id)}
                      style={{
                        padding: '0.4rem 0.8rem', 
                        borderRadius: '8px', 
                        border: 'none', 
                        background: 'var(--accent)', 
                        color: 'white',
                        cursor: 'pointer',
                        fontWeight: 600
                      }}
                    >
                      Abhaken
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="members-container">
          <h2 style={{marginBottom: '1.5rem'}}>Die Helden</h2>
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <div className="member-avatar">S</div>
              <span>Stefan</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <div className="member-avatar" style={{background: '#ec4899'}}>A</div>
              <span>Alexandra</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <div className="member-avatar" style={{background: '#f59e0b'}}>M</div>
              <span>Marlene (8)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
