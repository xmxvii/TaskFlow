import React, { createContext, useContext, useState } from 'react';
import { Task } from '../types';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  searchTasks: (query: string) => Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Design new landing page',
      description: 'Create wireframes and high-fidelity designs for the new marketing site',
      status: 'todo',
      priority: 'high',
      assignee: 'Sarah Chen',
      dueDate: '2024-03-25',
    },
    {
      id: '2',
      title: 'Implement authentication',
      description: 'Add user authentication using JWT tokens',
      status: 'in_progress',
      priority: 'medium',
      assignee: 'Mike Johnson',
      dueDate: '2024-03-20',
    },
    {
      id: '3',
      title: 'Write API documentation',
      description: 'Document all API endpoints using OpenAPI specification',
      status: 'done',
      priority: 'low',
      assignee: 'Alex Kumar',
      dueDate: '2024-03-15',
    },
  ]);

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask = {
      ...task,
      id: Math.random().toString(36).substr(2, 9),
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const searchTasks = (query: string) => {
    return tasks.filter(task => 
      task.title.toLowerCase().includes(query.toLowerCase()) ||
      task.description.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, searchTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};