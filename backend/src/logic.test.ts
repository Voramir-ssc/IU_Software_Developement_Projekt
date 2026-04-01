import { describe, it, expect } from 'vitest';

// Simuliertes Modell für Unit Tests ohne Datenbank-Abhängigkeit
const calculateRemainingPoints = (currentPoints: number, rewardCost: number): number => {
  if (currentPoints < rewardCost) {
    throw new Error('Nicht genug Punkte');
  }
  return currentPoints - rewardCost;
};

describe('Punkte-Logik (Unit Tests)', () => {
  it('sollte Punkte korrekt abziehen, wenn genug vorhanden sind', () => {
    const currentPoints = 500;
    const cost = 200;
    const remaining = calculateRemainingPoints(currentPoints, cost);
    expect(remaining).toBe(300);
  });

  it('sollte einen Fehler werfen, wenn nicht genug Punkte vorhanden sind', () => {
    const currentPoints = 100;
    const cost = 200;
    expect(() => calculateRemainingPoints(currentPoints, cost)).toThrow('Nicht genug Punkte');
  });

  it('sollte bei exakt passenden Punkten 0 zurückgeben', () => {
    const currentPoints = 200;
    const cost = 200;
    const remaining = calculateRemainingPoints(currentPoints, cost);
    expect(remaining).toBe(0);
  });
});
