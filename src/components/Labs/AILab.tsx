import React, { useState } from 'react';
import { Brain, Play, Pause, RotateCw, Database, GitBranch, TrendingUp } from 'lucide-react';

export default function AILab() {
  const [selectedModel, setSelectedModel] = useState('neural-arch-v2.3');
  const [trainingStatus, setTrainingStatus] = useState<'idle' | 'training' | 'paused'>('training');
  const [currentEpoch, setCurrentEpoch] = useState(147);
  const [loss, setLoss] = useState(0.0234);

  const models = [
    { id: 'neural-arch-v2.3', name: 'Neural Architecture Search v2.3', accuracy: 94.2, status: 'training' },
    { id: 'transformer-xl-4b', name: 'Transformer XL 4B', accuracy: 91.8, status: 'completed' },
    { id: 'quantum-nn-hybrid', name: 'Quantum-NN Hybrid', accuracy: 87.3, status: 'paused' },
    { id: 'neuromorphic-snn', name: 'Neuromorphic SNN', accuracy: 89.1, status: 'idle' }
  ];

  const datasets = [
    { name: 'Research Papers Corpus', size: '2.3TB', samples: '45M', status: 'active' },
    { name: 'Multimodal Dataset v4', size: '1.8TB', samples: '23M', status: 'processing' },
    { name: 'Synthetic Data Gen', size: '890GB', samples: '12M', status: 'complete' }
  ];

  const toggleTraining = () => {
    setTrainingStatus(prev => prev === 'training' ? 'paused' : 'training');
  };

  React.useEffect(() => {
    if (trainingStatus === 'training') {
      const interval = setInterval(() => {
        setCurrentEpoch(prev => prev + 1);
        setLoss(prev => Math.max(0.001, prev - 0.0001 + (Math.random() - 0.5) * 0.001));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [trainingStatus]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-mono text-gray-100 flex items-center">
          <Brain className="w-6 h-6 mr-2" />
          ARTIFICIAL INTELLIGENCE LAB
        </h2>
        <div className="text-sm font-mono text-gray-400">
          NODE: AI-CLUSTER-07 | GPU: 8x A100
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {/* Model Training Pipeline */}
          <div className="bg-gray-800 border border-gray-600 p-6">
            <h3 className="text-lg font-mono text-gray-100 mb-4">TRAINING PIPELINE</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <select 
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="bg-gray-700 border border-gray-600 text-gray-100 font-mono text-sm p-2 focus:outline-none focus:border-gray-400"
                >
                  {models.map(model => (
                    <option key={model.id} value={model.id}>{model.name}</option>
                  ))}
                </select>
                
                <div className="flex space-x-2">
                  <button
                    onClick={toggleTraining}
                    className="bg-gray-700 hover:bg-gray-600 text-gray-100 p-2 border border-gray-600 transition-colors"
                  >
                    {trainingStatus === 'training' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 text-gray-100 p-2 border border-gray-600 transition-colors">
                    <RotateCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="bg-gray-700 p-3">
                  <div className="text-xs font-mono text-gray-400 mb-1">STATUS</div>
                  <div className={`text-sm font-mono ${
                    trainingStatus === 'training' ? 'text-green-500' : 
                    trainingStatus === 'paused' ? 'text-yellow-500' : 'text-gray-500'
                  }`}>
                    {trainingStatus.toUpperCase()}
                  </div>
                </div>
                <div className="bg-gray-700 p-3">
                  <div className="text-xs font-mono text-gray-400 mb-1">EPOCH</div>
                  <div className="text-sm font-mono text-gray-100">{currentEpoch}/500</div>
                </div>
                <div className="bg-gray-700 p-3">
                  <div className="text-xs font-mono text-gray-400 mb-1">LOSS</div>
                  <div className="text-sm font-mono text-gray-100">{loss.toFixed(4)}</div>
                </div>
                <div className="bg-gray-700 p-3">
                  <div className="text-xs font-mono text-gray-400 mb-1">ACCURACY</div>
                  <div className="text-sm font-mono text-gray-100">94.2%</div>
                </div>
              </div>

              <div className="bg-gray-700 p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-mono text-gray-300">Training Progress</span>
                  <span className="text-sm font-mono text-gray-300">{((currentEpoch / 500) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-600 h-2">
                  <div 
                    className="h-2 bg-blue-500 transition-all duration-300"
                    style={{ width: `${(currentEpoch / 500) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Model Versions */}
          <div className="bg-gray-800 border border-gray-600 p-6">
            <h3 className="text-lg font-mono text-gray-100 mb-4 flex items-center">
              <GitBranch className="w-5 h-5 mr-2" />
              MODEL REGISTRY
            </h3>
            
            <div className="space-y-2">
              {models.map(model => (
                <div key={model.id} className="bg-gray-700 border border-gray-600 p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-mono text-gray-100">{model.name}</div>
                      <div className="text-xs font-mono text-gray-400">Accuracy: {model.accuracy}%</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`text-xs font-mono px-2 py-1 rounded ${
                        model.status === 'training' ? 'bg-green-900 text-green-300' :
                        model.status === 'completed' ? 'bg-blue-900 text-blue-300' :
                        model.status === 'paused' ? 'bg-yellow-900 text-yellow-300' :
                        'bg-gray-600 text-gray-300'
                      }`}>
                        {model.status.toUpperCase()}
                      </span>
                      <button className="text-gray-400 hover:text-gray-200">
                        <TrendingUp className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Datasets Panel */}
        <div className="space-y-6">
          <div className="bg-gray-800 border border-gray-600 p-6">
            <h3 className="text-lg font-mono text-gray-100 mb-4 flex items-center">
              <Database className="w-5 h-5 mr-2" />
              DATASETS
            </h3>
            
            <div className="space-y-3">
              {datasets.map((dataset, index) => (
                <div key={index} className="bg-gray-700 border border-gray-600 p-3">
                  <div className="text-sm font-mono text-gray-100 mb-2">{dataset.name}</div>
                  <div className="space-y-1 text-xs font-mono text-gray-400">
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span>{dataset.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Samples:</span>
                      <span>{dataset.samples}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className={
                        dataset.status === 'active' ? 'text-green-400' :
                        dataset.status === 'processing' ? 'text-yellow-400' :
                        'text-blue-400'
                      }>
                        {dataset.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resource Monitor */}
          <div className="bg-gray-800 border border-gray-600 p-6">
            <h3 className="text-lg font-mono text-gray-100 mb-4">RESOURCE USAGE</h3>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm font-mono mb-1">
                  <span className="text-gray-300">GPU Memory</span>
                  <span className="text-gray-300">87%</span>
                </div>
                <div className="w-full bg-gray-600 h-2">
                  <div className="h-2 bg-red-500" style={{ width: '87%' }} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm font-mono mb-1">
                  <span className="text-gray-300">GPU Utilization</span>
                  <span className="text-gray-300">92%</span>
                </div>
                <div className="w-full bg-gray-600 h-2">
                  <div className="h-2 bg-orange-500" style={{ width: '92%' }} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm font-mono mb-1">
                  <span className="text-gray-300">Network I/O</span>
                  <span className="text-gray-300">34%</span>
                </div>
                <div className="w-full bg-gray-600 h-2">
                  <div className="h-2 bg-green-500" style={{ width: '34%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}