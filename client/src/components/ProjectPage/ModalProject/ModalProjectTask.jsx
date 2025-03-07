import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { X, Plus } from 'lucide-react';

import { nanoid } from 'nanoid';

import useUserStore from '../../../store/userStore';

const ModalProjectTask = ({
  projectOrTaskId,
  setProjectOrTaskId,
  setModalProject,
}) => {
  // note: projectOrItem === item._id
  const { currentProject, updateTask, deleteTask } = useUserStore();
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

  // removes subtask from currentTask
  const removeSubtask = (subtaskId) => {
    setCurrentTask({
      ...currentTask,
      subtasks: currentTask.subtasks.filter(
        (subtask) => subtask._id !== subtaskId,
      ),
    });
  };

  // create subtask in currentTask
  const createSubtask = () => {
    const newSubtask = {
      subtaskName: '',
      completed: false,
      _id: nanoid(),
    };

    setCurrentTask({
      ...currentTask,
      subtasks: [...currentTask.subtasks, newSubtask],
    });
  };

  // saves currentTask to the currentProject
  const saveNewProjectHandler = () => {
    //validates if there are any changes made
    if (
      currentTask.taskName === currentTaskPreChanges.taskName &&
      currentTask.dueDate === currentTaskPreChanges.dueDate &&
      currentTask.subtasks === currentTaskPreChanges.subtasks
    )
      return console.log('No changes made');

    updateTask(currentTask, currentProject._id);
  };

  // delete task
  const deleteTaskHandler = () => {
    deleteTask(currentTask._id, currentProject._id);
    setProjectOrTaskId('project');
    setModalProject(false);
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
    <div
      style={{ height: 'calc(100% - 40px)' }}
      className="-mt-3.5 flex flex-col justify-between"
    >
      <div className="flex flex-col gap-5">
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
          <div className="flex h-fit w-full flex-col gap-1">
            {currentTask.subtasks.map((subtask) => (
              <div key={subtask._id} className="flex h-8 items-center gap-1">
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
                  className="text-light-text border-light-gray h-full w-full rounded-2xl border pl-5"
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
                <X
                  className="hover:text-default-text text-light-gray h-full w-8 cursor-pointer duration-200"
                  onClick={() => removeSubtask(subtask._id)}
                />
              </div>
            ))}
            <Plus
              className="hover:text-default-text text-light-text bg-white-gray m-auto mt-2 h-8 w-11/12 cursor-pointer rounded-2xl duration-200"
              onClick={createSubtask}
            />
          </div>
        </div>
      </div>
      {/* Save/Delete Task */}
      <div className="flex justify-between p-3 pt-15">
        <button
          onClick={deleteTaskHandler}
          className="h-11 w-40 cursor-pointer rounded-2xl border border-[#D9D9D9] bg-[#F6F6F6] text-sm font-semibold text-[#BD3D3D] hover:bg-[#ebebeb] active:bg-[#F6F6F6]"
        >
          Delete Project
        </button>

        <button
          onClick={saveNewProjectHandler}
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
  setProjectOrTaskId: PropTypes.func.isRequired,
  setModalProject: PropTypes.func.isRequired,
};

export default ModalProjectTask;
