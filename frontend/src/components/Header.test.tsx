import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header Komponente', () => {
  it('sollte den App-Namen korrekt anzeigen', () => {
    render(<Header />);
    expect(screen.getByText('Familien Hero')).toBeInTheDocument();
  });

  it('sollte das Logo-Icon enthalten', () => {
    render(<Header />);
    expect(screen.getByText('FH')).toBeInTheDocument();
  });

  it('sollte eine Willkommensnachricht für Stefan enthalten', () => {
    render(<Header />);
    expect(screen.getByText(/Hallo,/)).toBeInTheDocument();
    expect(screen.getByText('Stefan')).toBeInTheDocument();
  });
});
