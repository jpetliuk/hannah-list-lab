import axios from 'axios';

const API_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:4000/api/user'
    : '/api/user';

const AUTH_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:4000/auth'
    : '/auth';

// User-related API calls
export const fetchUser = async () => {
  const response = await axios.get(API_URL, { withCredentials: true });
  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.post(
    `${AUTH_URL}/logout`,
    {},
    { withCredentials: true },
  );
  return response.data;
};

// Project-related API calls
export const createProject = async (projectName) => {
  const response = await axios.post(
    `${API_URL}/project/create`,
    { projectName },
    { withCredentials: true },
  );
  return response.data;
};

export const updateProject = async (updatedProject) => {
  const response = await axios.put(
    `${API_URL}/project/update`,
    { updatedProject },
    { withCredentials: true },
  );
  return response.data;
};

export const deleteProject = async (projectId) => {
  const response = await axios.delete(`${API_URL}/project/${projectId}`, {
    withCredentials: true,
  });
  return response.data;
};

// Task-related API calls
export const createTask = async (newTask, projectId) => {
  const response = await axios.post(
    `${API_URL}/project/create-task`,
    { newTask, projectId },
    { withCredentials: true },
  );
  return response.data;
};

export const updateTask = async (updatedTask, projectId) => {
  const response = await axios.put(
    `${API_URL}/project/update-task`,
    { updatedTask, projectId },
    { withCredentials: true },
  );
  return response.data;
};

export const deleteTask = async (taskId, projectId) => {
  const response = await axios.delete(
    `${API_URL}/project/${projectId}/${taskId}`,
    { withCredentials: true },
  );
  return response.data;
};

// Sticky note-related API calls
export const upsertStickyNote = async (stickyNote) => {
  const response = await axios.put(`${API_URL}/sticky-notes`, stickyNote, {
    withCredentials: true,
  });
  return response.data;
};

export const deleteStickyNote = async (id) => {
  const response = await axios.delete(`${API_URL}/sticky-notes`, {
    data: { _id: id },
    withCredentials: true,
  });
  return response.data;
};
