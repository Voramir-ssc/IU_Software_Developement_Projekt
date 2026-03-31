/**
 * Repraesentiert ein Benutzerobjekt aus der Datenbank.
 */
export interface User {
  _id: string;
  name: string;
  role: 'parent' | 'child';
  points: number;
}

/**
 * Referenz-Typ fuer Benutzer, wie er oft in Aufgaben eingebettet wird (Populated).
 */
export interface UserRef {
  _id: string;
  name: string;
  role?: string;
}

/**
 * Repraesentiert eine Aufgabe (Task) innerhalb der Hero-App.
 */
export interface Task {
  _id: string;
  title: string;
  description?: string;
  assignedTo: UserRef;
  pointsReward: number;
  status: 'open' | 'done';
}
