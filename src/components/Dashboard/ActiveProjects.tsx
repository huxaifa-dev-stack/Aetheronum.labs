import React from 'react';
import { FolderOpen, Clock, Users, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const mockProjects = [
  {
    id: '1',
    name: 'Neural Architecture Search v2.3',
    status: 'active' as const,
    progress: 67,
    priority: 'high' as const,
    assignedTo: ['Dr. Chen', 'Marcus R.'],
    deadline: new Date('2025-02-15'),
    lab: 'ai' as const,
    timeline: []
  },
  {
    id: '2', 
    name: 'Quantum Error Correction Protocol',
    status: 'active' as const,
    progress: 43,
    priority: 'critical' as const,
    assignedTo: ['Elena V.', 'James W.'],
    deadline: new Date('2025-01-30'),
    lab: 'quantum' as const,
    timeline: []
  },
  {
    id: '3',
    name: 'Neuromorphic Spike Processing',
    status: 'paused' as const,
    progress: 89,
    priority: 'medium' as const,
    assignedTo: ['Dr. Chen'],
    deadline: new Date('2025-03-01'),
    lab: 'neuromorphic' as const,
    timeline: []
  }
];

export default function ActiveProjects() {
  const { dispatch } = useApp();

  React.useEffect(() => {
    mockProjects.forEach(project => {
      dispatch({ type: 'UPDATE_PROJECT', payload: { id: project.id, updates: project } });
    });
  }, [dispatch]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-500';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-yellow-500';
      default: return 'text-green-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-500';
      case 'paused': return 'text-yellow-500';
      case 'completed': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-600 p-6">
      <h3 className="text-lg font-mono text-gray-100 mb-4 flex items-center">
        <FolderOpen className="w-5 h-5 mr-2" />
        ACTIVE RESEARCH PROJECTS
      </h3>
      
      <div className="space-y-4">
        {mockProjects.map((project) => (
          <div key={project.id} className="bg-gray-700 border border-gray-600 p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h4 className="text-gray-100 font-mono text-sm mb-1">{project.name}</h4>
                <div className="flex items-center space-x-4 text-xs font-mono text-gray-400">
                  <span className={getStatusColor(project.status)}>
                    {project.status.toUpperCase()}
                  </span>
                  <span className={getPriorityColor(project.priority)}>
                    <AlertCircle className="w-3 h-3 inline mr-1" />
                    {project.priority.toUpperCase()}
                  </span>
                  <span>
                    <Clock className="w-3 h-3 inline mr-1" />
                    {project.deadline.toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-mono text-gray-300 mb-1">{project.progress}%</div>
                <div className="w-16 bg-gray-600 h-1">
                  <div 
                    className="h-1 bg-blue-500 transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-xs font-mono text-gray-400">
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>{project.assignedTo.join(', ')}</span>
              </div>
              <span className="bg-gray-600 px-2 py-1 rounded text-xs">
                {project.lab.toUpperCase()} LAB
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}