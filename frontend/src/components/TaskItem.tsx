import React from 'react';
import type { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onComplete: (id: string) => void;
}

/**
 * TaskItem Component
 * Renders a single task with its details and dynamic status actions.
 * Contains a button to mark an 'open' task as 'done'.
 * 
 * @param props.task - The task object containing title, status, etc.
 * @param props.onComplete - Callback executed when the task is marked as done
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
