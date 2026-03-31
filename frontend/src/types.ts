export interface UserRef {
  _id: string;
  name: string;
  role?: string;
}

export interface Task {
  _id: string;
  title: string;
  assignedTo: UserRef;
  pointsReward: number;
  status: 'open' | 'done';
}
