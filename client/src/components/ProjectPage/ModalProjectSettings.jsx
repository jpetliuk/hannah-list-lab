import { X } from 'lucide-react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import useUserStore from '../../store/userStore';

const ProjectSettings = () => {
  const { currentProject, saveProject } = useUserStore();

  const [currentProjectSettings, setCurrentProjectSettings] = useState(null);

  const updateProjectSettings = (updatedSettings) => {
    setCurrentProjectSettings(updatedSettings);
  };

  useEffect(() => {
    setCurrentProjectSettings(currentProject);
  }, [currentProject]);

  if (!currentProjectSettings) return;

  const saveNewProject = () => {
    saveProject({ ...currentProjectSettings });

    console.log(currentProjectSettings);
  };

  if (!currentProjectSettings) return <div>Loading...</div>;

  return (
    <div className="-mt-3.5 flex flex-col gap-5">
      {/* Project Title */}
      <div>
        <h2 className="text-light-text pb-1 pl-4 text-2xl font-semibold">
          Project Title:
        </h2>
        <input
          name="project-title"
          type="text"
          autoComplete="off"
          className="text-light-text border-light-gray w-full rounded-2xl border py-2.5 pl-10"
          placeholder="Project name"
          maxLength={35}
          value={currentProjectSettings.projectName || ''}
          onChange={(e) =>
            updateProjectSettings({
              ...currentProjectSettings,
              projectName: e.target.value,
            })
          }
        />
      </div>

      {/* Project Picture */}
      <div>
        <h2 className="text-light-text pb-1 pl-4 text-2xl font-semibold">
          Project Picture:
        </h2>
        <div className="h-40 w-full border"></div>
      </div>

      {/* Project Description */}
      <div>
        <h2 className="text-light-text pb-1 pl-4 text-2xl font-semibold">
          Description:
        </h2>
        <textarea
          autoComplete="off"
          className="text-light-text border-light-gray h-40 w-full resize-none rounded-2xl border px-3 py-2"
          placeholder="Project name"
          value={currentProjectSettings.description || ''}
          onChange={(e) =>
            updateProjectSettings({
              ...currentProjectSettings,
              description: e.target.value,
            })
          }
        />
      </div>

      <div className="flex items-center justify-around">
        {/* Due Date */}
        <div className="flex items-center justify-center gap-3">
          <h2 className="text-light-text pb-1 pl-4 text-base font-normal">
            Due date:
          </h2>
          <input
            autoComplete="off"
            className="text-light-text border-light-gray w-20 rounded-lg border"
            placeholder="Project name"
            value={currentProjectSettings.dueDate || ''}
            onChange={(e) =>
              updateProjectSettings({
                ...currentProjectSettings,
                dueDate: e.target.value,
              })
            }
          />
        </div>

        {/* Color */}
        <div className="flex items-center justify-center gap-3">
          <h2 className="text-light-text pb-1 pl-4 text-base font-normal">
            color:
          </h2>
          <input
            autoComplete="off"
            className="text-light-text border-light-gray w-20 rounded-lg border"
            placeholder="Project name"
            value={currentProjectSettings.color || ''}
            onChange={(e) =>
              updateProjectSettings({
                ...currentProjectSettings,
                color: e.target.value,
              })
            }
          />
        </div>
      </div>

      {/* Save/Delete Project */}
      <div className="flex justify-between p-3 pt-15">
        <button
          onClick={''}
          className="h-11 w-40 cursor-pointer rounded-2xl border border-[#D9D9D9] bg-[#F6F6F6] text-sm font-semibold text-[#BD3D3D] hover:bg-[#ebebeb] active:bg-[#F6F6F6]"
        >
          Delete Project
        </button>

        <button
          onClick={saveNewProject}
          className="bg-button-yellow text-default-text hover:bg-button-yellow-hover active:bg-button-yellow h-11 w-40 cursor-pointer rounded-2xl font-semibold"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

const ProjectTask = ({ projectOrTaskId }) => {
  // note: projectOrItem === item._id
  const { saveProject, currentProject } = useUserStore();
  const [currentTask, setCurrentTask] = useState(null);

  const updateProjectTask = (updatedTask) => {
    setCurrentTask(updatedTask);
  };

  const updateSubtask = (updatedTask) => {
    console.log(updatedTask);
    const updatedSubtasks = currentTask.subtasks.map((subtask) =>
      subtask._id === updatedTask._id ? updatedTask : subtask,
    );
    setCurrentTask({ ...currentTask, subtasks: updatedSubtasks });
  };

  useEffect(() => {
    const taskFound = currentProject.tasks.find(
      (task) => task._id === projectOrTaskId,
    );

    setCurrentTask(taskFound || null);
  }, [currentProject.tasks, projectOrTaskId]);

  const saveNewProject = () => {
    const updatedProjects = {
      ...currentProject,
      tasks: currentProject.tasks.map((task) =>
        task._id === currentTask._id ? { ...task, ...currentTask } : task,
      ),
    };

    saveProject({ ...updatedProjects });
    console.log(updatedProjects);
  };

  if (!currentTask) return <div>Loading...</div>;

  return (
    <div className="-mt-3.5 flex flex-col gap-5">
      {/* Task Title */}
      <div>
        <h2 className="text-light-text pb-1 pl-4 text-2xl font-semibold">
          Task:
        </h2>
        <input
          name="task-name"
          type="text"
          autoComplete="off"
          className="text-light-text border-light-gray w-full rounded-2xl border py-2.5 pl-10"
          placeholder="Task name"
          maxLength={35}
          value={currentTask.taskName || ''}
          onChange={(e) =>
            updateProjectTask({ ...currentTask, taskName: e.target.value })
          }
        />
      </div>

      {/* Task Due Date */}
      <div className="flex items-center justify-center gap-3">
        <h2 className="text-light-text pb-1 pl-4 text-base font-normal">
          Due date:
        </h2>
        <input
          name="due-date"
          autoComplete="off"
          className="text-light-text border-light-gray w-20 rounded-lg border"
          placeholder="Project name"
          value={currentTask.dueDate || ''}
          onChange={(e) =>
            updateProjectTask({ ...currentTask, dueDate: e.target.value })
          }
        />
      </div>

      {/* Subtasks */}
      <div>
        <h2 className="text-light-text pb-1 pl-4 text-2xl font-semibold">
          Subtasks:
        </h2>
        <div className="h-40 w-full">
          {currentTask.subtasks.map((subtask) => (
            <div key={subtask._id} className="flex items-center gap-1">
              <input
                type="checkbox"
                className="h-6 w-6 appearance-none rounded-md border-2 border-gray-500 checked:border-transparent checked:bg-blue-500"
                checked={subtask.completed}
                onChange={(e) =>
                  updateSubtask({
                    ...subtask,
                    completed: e.target.checked,
                  })
                }
              />

              <input
                name="subtask-name"
                type="text"
                autoComplete="off"
                className="text-light-text border-light-gray w-full rounded-2xl border py-2.5 pl-10"
                placeholder="subtask"
                maxLength={35}
                value={subtask.subtaskName || ''}
                onChange={(e) =>
                  updateSubtask({
                    ...subtask,
                    subtaskName: e.target.value,
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Save/Delete Task */}
      <div className="flex justify-between p-3 pt-15">
        <button
          onClick={''}
          className="h-11 w-40 cursor-pointer rounded-2xl border border-[#D9D9D9] bg-[#F6F6F6] text-sm font-semibold text-[#BD3D3D] hover:bg-[#ebebeb] active:bg-[#F6F6F6]"
        >
          Delete Project
        </button>

        <button
          onClick={saveNewProject}
          className="bg-button-yellow text-default-text hover:bg-button-yellow-hover active:bg-button-yellow h-11 w-40 cursor-pointer rounded-2xl font-semibold"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

const ModalProjectSettings = ({
  parentWidth,
  modalProject,
  setModalProject,
  projectOrTaskId,
}) => {
  return (
    <div
      style={
        modalProject
          ? {
              width: `${(parentWidth * 2) / 5 + 20}px`,
              minWidth: `${(parentWidth * 2) / 5 + 20}px`,
            }
          : { width: 0, minWidth: 0 }
      }
      className="min-h-full duration-600 ease-in-out"
    >
      <div
        style={
          modalProject
            ? {
                width: `${(parentWidth * 2) / 5}px`,
                minWidth: `${(parentWidth * 2) / 5}px`,
              }
            : { width: 0, minWidth: 0 }
        }
        className="fixed top-0 ml-5 h-screen overflow-hidden py-5 duration-600 ease-in-out"
      >
        <div
          style={{
            width: `${(parentWidth * 2) / 5}px`,
            minWidth: `${(parentWidth * 2) / 5}px`,
          }}
          className="border-outline bg-custom-white h-full w-full overflow-y-auto rounded-3xl border p-3"
        >
          <X
            onClick={() => setModalProject(false)}
            className="text-light-text hover:text-default-text ml-auto h-10 w-10 cursor-pointer"
          />

          {projectOrTaskId === 'project' ? (
            <ProjectSettings />
          ) : (
            <ProjectTask projectOrTaskId={projectOrTaskId} />
          )}
        </div>
      </div>
    </div>
  );
};

ModalProjectSettings.propTypes = {
  parentWidth: PropTypes.number.isRequired,
  projectOrTaskId: PropTypes.string.isRequired,
  modalProject: PropTypes.bool.isRequired,
  setModalProject: PropTypes.func.isRequired,
};

ProjectTask.propTypes = {
  projectOrTaskId: PropTypes.string.isRequired,
};

export default ModalProjectSettings;
