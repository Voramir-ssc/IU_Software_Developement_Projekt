import React from 'react';
import type { Task } from '../types';

interface StatsGridProps {
  tasks: Task[];
  marlenePoints: number;
  apiStatus: string;
}

/**
 * StatsGrid-Komponente
 * Zeigt die uebergeordneten Kennzahlen der Anwendung an:
 * - Anzahl der offenen Aufgaben
 * - Derzeitige Punkte des Kindes (Gamification-Element)
 * - Aktueller API-Status
 * 
 * @param props.tasks - Array aller Aufgaben
 * @param props.marlenePoints - Aktueller Punktestand des Kindes
 * @param props.apiStatus - Verbindungsstatus zum Backend
 */
export const StatsGrid: React.FC<StatsGridProps> = ({ tasks, marlenePoints, apiStatus }) => {
  const openTasksCount = tasks.filter(t => t.status === 'open').length;
  const targetPoints = 600;

  return (
    <div className="stats-grid">
      <div className="card">
        <h3>Offene Aufgaben</h3>
        <div className="value">{openTasksCount}</div>
      </div>
      <div className="card marlene-special" data-testid="marlene-points-card">
        <h3>Marlenes Super-Punkte</h3>
        <div className="value">{marlenePoints} ★</div>
        <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
          {marlenePoints < targetPoints 
            ? `Noch ${targetPoints - marlenePoints} bis zum LEGO Set!` 
            : 'Ziel erreicht! LEGO Zeit!'}
        </p>
      </div>
      <div className="card">
        <h3>API Status</h3>
        <div className="value" style={{
          fontSize: '1rem', 
          color: apiStatus.includes('running') ? 'var(--accent)' : 'var(--secondary)'
        }}>
          {apiStatus}
        </div>
      </div>
    </div>
  );
};
