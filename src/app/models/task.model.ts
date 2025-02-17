export interface Task {
completed: boolean;
  id?: string;
  title: string;
  description: string;
  status: 'To-Do' | 'In Progress' | 'Done';
  createdAt: number;
}