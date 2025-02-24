import { Navigate, Route, Routes } from 'react-router-dom';

import WelcomeLayout from './layouts/WelcomeLayout';
import GetStarted from './pages/WelcomePage/GetStarted';
import Login from './pages/WelcomePage/Login';

import DashboardLayout from './layouts/DashboardLayout';
import HomePage from './pages/DashboardPage/HomePage';
import ProjectPage from './pages/DashboardPage/ProjectPage';
import CalendarPage from './pages/DashboardPage/CalendarPage';
import StickyNotesPage from './pages/DashboardPage/StickyNotesPage';
import TaskProgressPage from './pages/DashboardPage/TaskProgressPage';
import NotFound404Page from './pages/DashboardPage/NotFound404Page';

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomeLayout />}>
        <Route index element={<GetStarted />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<HomePage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="sticky-notes" element={<StickyNotesPage />} />
        <Route path="task-progress" element={<TaskProgressPage />} />
        <Route path="project/:id" element={<ProjectPage />} />

        <Route path="*" element={<NotFound404Page />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
