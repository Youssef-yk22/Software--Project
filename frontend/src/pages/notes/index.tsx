import { useState } from 'react';
import Navbar from '@/components/Navbar';

interface Note {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  content: string;
  createdAt: string;
}

const mockNotes: Note[] = [
  {
    id: '1',
    courseId: '1',
    courseName: 'Introduction to Web Development',
    title: 'HTML Basics',
    content: 'HTML tags are used to structure web content...',
    createdAt: '2024-03-10',
  },
  // Add more mock notes
];

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Notes List */}
          <div className="md:col-span-1">
            <div className="rounded-lg bg-white p-4 shadow">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">My Notes</h2>
                <button className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700">
                  New Note
                </button>
              </div>
              <div className="space-y-2">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className={`cursor-pointer rounded-lg p-3 hover:bg-gray-50 ${
                      selectedNote?.id === note.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedNote(note)}
                  >
                    <h3 className="font-medium">{note.title}</h3>
                    <p className="text-sm text-gray-500">{note.courseName}</p>
                    <p className="text-xs text-gray-400">{note.createdAt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Note Editor */}
          <div className="md:col-span-2">
            <div className="rounded-lg bg-white p-4 shadow">
              {selectedNote ? (
                <div>
                  <input
                    type="text"
                    value={selectedNote.title}
                    className="mb-4 w-full rounded-lg border-0 px-3 py-2 text-lg font-medium ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600"
                  />
                  <textarea
                    value={selectedNote.content}
                    rows={12}
                    className="w-full rounded-lg border-0 px-3 py-2 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  Select a note or create a new one
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 