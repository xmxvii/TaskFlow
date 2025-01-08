import React from 'react';
import { Task } from '../types';
import TaskCard from './TaskCard';

interface TaskListProps {
  title: string;
  tasks: Task[];
  onEditTask: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ title, tasks, onEditTask }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 min-w-[300px]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-700">{title}</h2>
        <span className="bg-gray-200 px-2 py-1 rounded-full text-sm text-gray-600">
          {tasks.length}
        </span>
      </div>
      
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={onEditTask} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;