import React from 'react';
import { Layout, Home, CheckSquare, Users, workflow, Settings, Workflow } from 'lucide-react';

interface SidebarProps {
  onNavigate: (view: 'tasks' | 'settings') => void;
  currentView: 'tasks' | 'settings';
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate, currentView }) => {
  return (
    <div className="w-64 bg-gray-900 h-screen fixed left-0 top-0 text-white p-4">
      <div className="flex items-center gap-2 mb-8">
        <Layout className="w-8 h-8 text-blue-400" />
        <span className="text-xl font-bold">TaskFlow</span>
      </div>
      
      <nav className="space-y-2">
        <button
          onClick={() => onNavigate('tasks')}
          className={`w-full flex items-center gap-3 p-3 rounded-lg ${
            currentView === 'tasks' ? 'bg-gray-800' : 'hover:bg-gray-800'
          } transition-colors`}
        >
          <CheckSquare className="w-5 h-5" />
          <span>Tasks</span>
        </button>
        <button
          onClick={() => onNavigate('workflows')}
          className={`w-full flex items-center gap-3 p-3 rounded-lg ${
            currentView === 'workflows' ? 'bg-gray-800' : 'hover:bg-gray-800'
          } transition-colors`}
        >
          <Workflow className="w-5 h-5" />
          <span>Workflows</span>
        </button>
        <button
          onClick={() => onNavigate('settings')}
          className={`w-full flex items-center gap-3 p-3 rounded-lg ${
            currentView === 'settings' ? 'bg-gray-800' : 'hover:bg-gray-800'
          } transition-colors`}
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;