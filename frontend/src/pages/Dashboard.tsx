import React, { useEffect, useState } from 'react';
import { StatsGrid } from '../components/StatsGrid';
import { TaskItem } from '../components/TaskItem';
import type { Task } from '../types';

/**
 * Dashboard Page
 * Main view showing task statistics, current points, and the list of tasks.
 */
const Dashboard: React.FC = () => {
  const [apiStatus, setApiStatus] = useState<string>('Connecting...');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [marlenePoints, setMarlenePoints] = useState<number>(0);

  /**
   * Fetches the current state from the backend.
   */
  const fetchData = async () => {
    try {
      // 1. Check API Health
      const healthRes = await fetch('http://localhost:5000/api/health');
      if (healthRes.ok) {
        const healthData = await healthRes.json();
        setApiStatus(healthData.message);
      } else {
        setApiStatus('Backend Fehler');
      }

      // 2. Fetch Tasks
      const tasksRes = await fetch('http://localhost:5000/api/tasks');
      const tasksData = await tasksRes.json();
      setTasks(tasksData);

      // 3. Fetch Child Points specifically for the dashboard
      const childTask = tasksData.find((t: any) => t.assignedTo?.role === 'child');
      if (childTask) {
        const pointsRes = await fetch(`http://localhost:5000/api/tasks/user/${childTask.assignedTo._id}/points`);
        const pointsData = await pointsRes.json();
        setMarlenePoints(pointsData.points);
      }
    } catch (err) {
      console.error('Data Fetch Error:', err);
      setApiStatus('Backend Offline');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /**
   * Completes a task by its ID and refreshes the view.
   * @param id The unique identifier of the task
   */
  const completeTask = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}/done`, { method: 'PUT' });
      if (res.ok) {
        fetchData(); // Refresh UI State
      }
    } catch (err) {
      console.error('Error completing task:', err);
    }
  };

  return (
    <>
      <StatsGrid tasks={tasks} marlenePoints={marlenePoints} apiStatus={apiStatus} />

      <div className="family-section">
        <div className="tasks-container">
          <h2 style={{ marginBottom: '1.5rem' }}>Anstehende Helden-Taten</h2>
          <div className="task-list">
            {tasks.map(task => (
              <TaskItem key={task._id} task={task} onComplete={completeTask} />
            ))}
          </div>
        </div>

        <div className="members-container">
          <h2 style={{ marginBottom: '1.5rem' }}>Die Helden</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="member-avatar">S</div>
              <span>Stefan (Eltern)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="member-avatar" style={{ background: '#ec4899' }}>A</div>
              <span>Alexandra (Eltern)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="member-avatar" style={{ background: '#f59e0b' }}>M</div>
              <span>Marlene (Kind)</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
