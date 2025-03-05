import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import useUserStore from '../../../store/userStore';

const ModalProjectTask = ({ projectOrTaskId }) => {
  // note: projectOrItem === item._id
  const { saveProject, currentProject } = useUserStore();
  const [currentTask, setCurrentTask] = useState(null);
  const [currentTaskPreChanges, setCurrentTaskPreChanges] = useState(null);

  // update state of currentTask
  const updateProjectTask = (updatedTask) => {
    setCurrentTask(updatedTask);
  };

  // update state of currentTask subtasks
  const updateSubtask = (updatedTask) => {
    const updatedSubtasks = currentTask.subtasks.map((subtask) =>
      subtask._id === updatedTask._id ? updatedTask : subtask,
    );
    setCurrentTask({ ...currentTask, subtasks: updatedSubtasks });
  };

  // saves currentTask to the currentProject
  const saveNewProject = () => {
    //validates if there are any changes made
    if (
      currentTask.taskName === currentTaskPreChanges.taskName &&
      currentTask.dueDate === currentTaskPreChanges.dueDate &&
      currentTask.subtasks === currentTaskPreChanges.subtasks
    )
      return console.log('No changes made');

    const updatedProjects = {
      ...currentProject,
      tasks: currentProject.tasks.map((task) =>
        task._id === currentTask._id ? { ...task, ...currentTask } : task,
      ),
    };

    saveProject({ ...updatedProjects });
    console.log(updatedProjects);
  };

  // sets currentTask to the task with the id of projectOrTaskId
  useEffect(() => {
    const taskFound = currentProject.tasks.find(
      (task) => task._id === projectOrTaskId,
    );

    setCurrentTask(taskFound || null);
    setCurrentTaskPreChanges(taskFound);
  }, [currentProject.tasks, projectOrTaskId]);

  if (currentTask === null) return <div>error</div>;

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

ModalProjectTask.propTypes = {
  projectOrTaskId: PropTypes.string.isRequired,
};

export default ModalProjectTask;
