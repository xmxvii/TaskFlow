import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import Settings from './components/Settings';
import { Task } from './types';
import { TaskProvider, useTaskContext } from './context/TaskContext';

function TaskBoard() {
  const { tasks, searchTasks, addTask, updateTask } = useTaskContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState<'tasks' | 'settings'>('tasks');

  const filteredTasks = searchQuery ? searchTasks(searchQuery) : tasks;
  const todoTasks = filteredTasks.filter(task => task.status === 'todo');
  const inProgressTasks = filteredTasks.filter(task => task.status === 'in_progress');
  const doneTasks = filteredTasks.filter(task => task.status === 'done');

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (task: Omit<Task, 'id'>) => {
    if (editingTask) {
      updateTask({ ...task, id: editingTask.id });
    } else {
      addTask(task);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTask(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar onNavigate={setCurrentView} currentView={currentView} />
      
      <main className="ml-64 p-8">
        {currentView === 'tasks' ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
                
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Add Task
                </button>
              </div>
            </div>
            
            <div className="flex gap-6 overflow-x-auto pb-4">
              <TaskList title="To Do" tasks={todoTasks} onEditTask={handleEditTask} />
              <TaskList title="In Progress" tasks={inProgressTasks} onEditTask={handleEditTask} />
              <TaskList title="Done" tasks={doneTasks} onEditTask={handleEditTask} />
            </div>

            <TaskModal
              isOpen={isModalOpen}
              onClose={handleModalClose}
              onSubmit={handleModalSubmit}
              initialTask={editingTask}
            />
          </>
        ) : (
          <Settings />
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <TaskProvider>
      <TaskBoard />
    </TaskProvider>
  );
}

export default App;