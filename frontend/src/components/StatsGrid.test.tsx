import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatsGrid } from './StatsGrid';
import type { Task } from '../types';

describe('StatsGrid Component', () => {
  it('renders correct open tasks count', () => {
    const mockTasks: Task[] = [
      { _id: '1', title: 'Task 1', status: 'open', assignedTo: { _id: 'a', name: 'S' }, pointsReward: 10 },
      { _id: '2', title: 'Task 2', status: 'done', assignedTo: { _id: 'a', name: 'S' }, pointsReward: 10 }
    ];

    render(<StatsGrid tasks={mockTasks} marlenePoints={100} apiStatus="OK" />);
    
    // There should be 1 open task
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders correct points logic for child', () => {
    render(<StatsGrid tasks={[]} marlenePoints={500} apiStatus="OK" />);
    
    expect(screen.getByText('500 ★')).toBeInTheDocument();
    expect(screen.getByText('Noch 100 bis zum LEGO Set!')).toBeInTheDocument();
  });
});
