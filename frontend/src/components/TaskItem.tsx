import React from 'react';
import type { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onComplete: (id: string) => void;
}

/**
 * TaskItem-Komponente
 * Rendert eine einzelne Aufgabe mit ihren Details und dynamischen Status-Aktionen.
 * Enthaelt eine Schaltflaeche, um eine offene Aufgabe als erledigt zu markieren.
 * 
 * @param props.task - Das Aufgaben-Objekt inkl. Titel, Status, etc.
 * @param props.onComplete - Callback, der beim Abschluss einer Aufgabe ausgefuehrt wird
 */
export const TaskItem: React.FC<TaskItemProps> = ({ task, onComplete }) => {
  return (
    <div 
      className="task-item" 
      style={{ opacity: task.status === 'done' ? 0.6 : 1 }}
      data-testid="task-item"
    >
      <div className="task-info">
        <h4>{task.title}</h4>
        <p>Zuständig: {task.assignedTo?.name || 'Unbekannt'}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div className="points-badge">+{task.pointsReward} Pkt</div>
        {task.status === 'open' && (
          <button 
            className="complete-btn"
            onClick={() => onComplete(task._id)}
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
  );
};
