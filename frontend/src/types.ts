/**
 * Repraesentiert ein Benutzerobjekt aus der Datenbank.
 * 
 * @interface User
 */
export interface User {
  /** Eindeutige ID des Benutzers aus der MongoDB */
  _id: string;
  /** Der Name des Benutzers */
  name: string;
  /** Die Rolle des Benutzers (bestimmt Berechtigungen) */
  role: 'parent' | 'child';
  /** Der aktuelle Punktestand des Benutzers */
  points: number;
}

/**
 * Referenz-Typ fuer Benutzer, wie er oft in Aufgaben eingebettet wird (Populated).
 * 
 * @interface UserRef
 */
export interface UserRef {
  /** Eindeutige ID des referenzierten Benutzers */
  _id: string;
  /** Der Name des referenzierten Benutzers */
  name: string;
  /** Die Rolle des referenzierten Benutzers (optional in Populated-Daten) */
  role?: string;
}

/**
 * Repraesentiert eine Aufgabe (Task) innerhalb der Hero-App.
 * 
 * @interface Task
 */
export interface Task {
  /** Eindeutige ID der Aufgabe aus der MongoDB */
  _id: string;
  /** Der Titel der Aufgabe */
  title: string;
  /** Eine optionale Beschreibung der Aufgabe */
  description?: string;
  /** Referenz auf den zugewiesenen Benutzer (Populated object) */
  assignedTo: UserRef;
  /** Belohnung in Sternen, die bei Abschluss vergeben wird */
  pointsReward: number;
  /** Der aktuelle Status der Aufgabe */
  status: 'open' | 'done';
}
