export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  dueDate?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}