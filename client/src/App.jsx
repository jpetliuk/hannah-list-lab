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
import HamsterWheel from './components/Loaders/HamsterWheel';

import { useEffect } from 'react';
import useUserStore from './store/userStore';

import PropTypes from 'prop-types';
import { useDarkMode } from './utils/useDarkMode';

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useUserStore();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useUserStore();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

RedirectAuthenticatedUser.propTypes = {
  children: PropTypes.node.isRequired,
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  const { isLoading, fetchUserData } = useUserStore();
  useDarkMode();

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return isLoading ? (
    <HamsterWheel />
  ) : (
    <Routes>
      <Route
        path="/"
        element={
          <RedirectAuthenticatedUser>
            <WelcomeLayout />
          </RedirectAuthenticatedUser>
        }
      >
        <Route index element={<GetStarted />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="sticky-notes" element={<StickyNotesPage />} />
        <Route path="task-progress" element={<TaskProgressPage />} />
        <Route path="project/:id" element={<ProjectPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
