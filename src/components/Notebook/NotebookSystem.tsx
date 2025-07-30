import React, { useState } from 'react';
import { BookOpen, Plus, Search, Tag, Link, Save } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Note, LabType } from '../../types';

export default function NotebookSystem() {
  const { state, dispatch } = useApp();
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editTags, setEditTags] = useState('');

  const filteredNotes = state.notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const createNewNote = () => {
    if (!newNoteTitle.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      title: newNoteTitle,
      content: '# ' + newNoteTitle + '\n\nStart writing your research notes here...',
      tags: [],
      lab: 'ai',
      created: new Date(),
      modified: new Date(),
      linkedNotes: []
    };

    dispatch({ type: 'ADD_NOTE', payload: newNote });
    setSelectedNote(newNote);
    setNewNoteTitle('');
    setIsEditing(true);
    setEditContent(newNote.content);
  };

  const startEditing = (note: Note) => {
    setSelectedNote(note);
    setIsEditing(true);
    setEditContent(note.content);
    setEditTags(note.tags.join(', '));
  };

  const saveNote = () => {
    if (!selectedNote) return;

    const tags = editTags.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    dispatch({
      type: 'UPDATE_NOTE',
      payload: {
        id: selectedNote.id,
        updates: {
          content: editContent,
          tags,
          modified: new Date()
        }
      }
    });

    setIsEditing(false);
    
    dispatch({
      type: 'ADD_LOG',
      payload: {
        id: Date.now().toString(),
        timestamp: new Date(),
        level: 'info',
        module: 'NOTEBOOK',
        message: `Note updated: ${selectedNote.title}`,
        user: state.user?.name
      }
    });
  };

  const renderMarkdown = (content: string) => {
    return content
      .replace(/^# (.*$)/gm, '<h1 class="text-xl font-bold text-gray-100 mb-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-lg font-bold text-gray-200 mb-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-md font-bold text-gray-300 mb-2">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-100">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-gray-300">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-700 text-green-400 px-1 py-0.5 rounded text-sm">$1</code>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-80 bg-gray-800 border-r border-gray-600 flex flex-col">
        <div className="p-4 border-b border-gray-600">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-mono text-gray-100 flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              RESEARCH NOTES
            </h2>
          </div>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 text-gray-100 pl-10 pr-4 py-2 text-sm font-mono focus:outline-none focus:border-gray-400"
            />
          </div>

          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="New note title..."
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              className="flex-1 bg-gray-700 border border-gray-600 text-gray-100 px-3 py-2 text-sm font-mono focus:outline-none focus:border-gray-400"
              onKeyPress={(e) => e.key === 'Enter' && createNewNote()}
            />
            <button
              onClick={createNewNote}
              className="bg-blue-700 hover:bg-blue-600 text-gray-100 p-2 border border-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => setSelectedNote(note)}
              className={`p-4 border-b border-gray-700 cursor-pointer transition-colors ${
                selectedNote?.id === note.id ? 'bg-gray-700' : 'hover:bg-gray-750'
              }`}
            >
              <h3 className="text-sm font-mono text-gray-100 mb-2 truncate">
                {note.title}
              </h3>
              <p className="text-xs font-mono text-gray-400 mb-2 line-clamp-2">
                {note.content.replace(/[#*`]/g, '').substring(0, 100)}...
              </p>
              <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-1">
                  {note.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className="bg-gray-600 text-gray-300 px-2 py-0.5 rounded text-xs font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-mono text-gray-500">
                  {note.modified.toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {selectedNote ? (
          <>
            <div className="bg-gray-800 border-b border-gray-600 p-4 flex justify-between items-center">
              <div>
                <h1 className="text-lg font-mono text-gray-100">{selectedNote.title}</h1>
                <p className="text-sm font-mono text-gray-400">
                  Created: {selectedNote.created.toLocaleDateString()} | 
                  Modified: {selectedNote.modified.toLocaleDateString()} |
                  Lab: {selectedNote.lab.toUpperCase()}
                </p>
              </div>
              <div className="flex space-x-2">
                {isEditing ? (
                  <button
                    onClick={saveNote}
                    className="bg-green-700 hover:bg-green-600 text-gray-100 px-4 py-2 border border-green-600 transition-colors flex items-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    SAVE
                  </button>
                ) : (
                  <button
                    onClick={() => startEditing(selectedNote)}
                    className="bg-blue-700 hover:bg-blue-600 text-gray-100 px-4 py-2 border border-blue-600 transition-colors"
                  >
                    EDIT
                  </button>
                )}
              </div>
            </div>

            {isEditing ? (
              <div className="flex-1 flex flex-col p-4 space-y-4">
                <div>
                  <label className="block text-sm font-mono text-gray-300 mb-2">
                    Tags (comma-separated):
                  </label>
                  <input
                    type="text"
                    value={editTags}
                    onChange={(e) => setEditTags(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 text-gray-100 px-3 py-2 text-sm font-mono focus:outline-none focus:border-gray-400"
                    placeholder="ai, quantum, research..."
                  />
                </div>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="flex-1 bg-gray-900 border border-gray-600 text-gray-100 p-4 font-mono text-sm focus:outline-none focus:border-gray-400 resize-none"
                  placeholder="Write your research notes here..."
                />
              </div>
            ) : (
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="mb-4 flex flex-wrap gap-2">
                  {selectedNote.tags.map((tag, index) => (
                    <span key={index} className="bg-blue-900 text-blue-300 px-3 py-1 rounded text-sm font-mono flex items-center">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
                <div 
                  className="prose prose-invert max-w-none font-mono text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(selectedNote.content) }}
                />
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-mono text-gray-400 mb-2">No Note Selected</h3>
              <p className="text-sm font-mono text-gray-500">
                Select a note from the sidebar or create a new one
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}