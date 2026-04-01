import React, { useEffect, useState } from 'react';
import { Plus, CheckCircle, Clock } from 'lucide-react';

interface User {
  _id: string;
  name: string;
}

interface Task {
  _id: string;
  title: string;
  assignedTo: User;
  pointsReward: number;
  status: 'open' | 'done';
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  
  // Form State
  const [title, setTitle] = useState('');
  const [points, setPoints] = useState(10);
  const [assignedTo, setAssignedTo] = useState('');

  const fetchData = async () => {
    // Fetch Tasks
    const taskRes = await fetch('http://localhost:5000/api/tasks');
    const taskData = await taskRes.json();
    setTasks(taskData);

    // Fetch Users for assignment
    const userRes = await fetch('http://localhost:5000/api/tasks'); // Temporary: reuse tasks to get unique users if no users endpoint
    const userData = await userRes.json();
    const uniqueUsers = userData.map((t: any) => t.assignedTo).filter((v: any, i: any, a: any) => a.findIndex((u: any) => u._id === v._id) === i);
    setUsers(uniqueUsers);
    if (uniqueUsers.length > 0 && !assignedTo) setAssignedTo(uniqueUsers[0]._id);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const completeTask = async (id: string) => {
    const res = await fetch(`http://localhost:5000/api/tasks/${id}/done`, { method: 'PUT' });
    if (res.ok) fetchData();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, pointsReward: points, assignedTo, status: 'open' })
    });
    if (res.ok) {
      setShowForm(false);
      setTitle('');
      fetchData();
    }
  };

  return (
    <div className="tasks-page">
      <div className="header-actions">
        <h2>Helden-Missionen</h2>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          <Plus size={20} />
          {showForm ? 'Abbrechen' : 'Neue Aufgabe'}
        </button>
      </div>

      {showForm && (
        <form className="task-form glass" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Titel der Aufgabe</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="z.B. Müll rausbringen" />
          </div>
          <div className="form-group">
            <label>Sterne Belohnung</label>
            <select value={points} onChange={(e) => setPoints(Number(e.target.value))}>
              <option value="5">5 Sterne</option>
              <option value="10">10 Sterne</option>
              <option value="20">20 Sterne</option>
              <option value="50">50 Sterne</option>
            </select>
          </div>
          <div className="form-group">
            <label>Zuweisen zu</label>
            <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
              {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
            </select>
          </div>
          <button type="submit" className="submit-btn">Heldentat anlegen</button>
        </form>
      )}

      <div className="task-list">
        {tasks.map(task => (
          <div key={task._id} className={`task-item ${task.status}`}>
            <div className="task-main">
              <div className="task-icon">
                {task.status === 'open' ? <Clock size={24} /> : <CheckCircle size={24} color="#10b981" />}
              </div>
              <div className="task-info">
                <h4>{task.title}</h4>
                <p>Held: {task.assignedTo.name}</p>
              </div>
            </div>
            <div className="task-actions">
              <div className="points-badge">+{task.pointsReward} ★</div>
              {task.status === 'open' && (
                <button className="complete-btn" onClick={() => completeTask(task._id)}>Erledigt!</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
