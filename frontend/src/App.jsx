import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Onboarding from './pages/Onboarding';
import Chat from './pages/Chat';
import './theme.css';

export default function App() {
  const [studentName, setStudentName] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            studentName
              ? <Navigate to="/chat" replace />
              : <Onboarding onStart={setStudentName} />
          }
        />
        <Route
          path="/chat"
          element={
            studentName
              ? <Chat studentName={studentName} />
              : <Navigate to="/" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
