// components/NotesFloatingButton.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StickyNote } from 'lucide-react'; // Adjust this import if you use a different icon library

const NotesFloatingButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      className="fixed bottom-7 right-7 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 border border-white-300 shadow-lg hover:bg-yellow-200 transition-all group"
      onClick={() => navigate("/notes")}
      aria-label="Notes"
      style={{ minWidth: 56, minHeight: 56 }}
    >
      <StickyNote className="w-7 h-7 text-blue-600 group-hover:scale-110 transition-transform" />
      <span className="sr-only">Notes</span>
    </button>
  );
};

export default NotesFloatingButton;
