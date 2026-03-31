export interface User {
  _id: string;
  name: string;
  role: 'parent' | 'child';
  points: number;
}

export interface UserRef {
  _id: string;
  name: string;
  role?: string;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  assignedTo: UserRef;
  pointsReward: number;
  status: 'open' | 'done';
}
