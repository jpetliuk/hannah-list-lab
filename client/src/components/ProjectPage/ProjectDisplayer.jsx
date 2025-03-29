import { SlidersHorizontal, Plus, Pencil } from 'lucide-react';
import PropTypes from 'prop-types';

import userStore from '../../store/userStore';
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';

const ProjectDisplayer = ({
  modalProject,
  setModalProject,
  projectOrTaskId,
  setProjectOrTaskId,
}) => {
  const [newTaskName, setNewTaskName] = useState('');
  const [completionPercentage, setCompletionPercentage] = useState('');
  const { currentProject, createTask } = userStore();

  const settingsButton = () => {
    projectOrTaskId === 'project' && modalProject
      ? setModalProject(false)
      : setModalProject(true);

    setProjectOrTaskId('project');
  };

  const taskButton = (taskId) => {
    projectOrTaskId === taskId && modalProject
      ? setModalProject(false)
      : setModalProject(true);

    setProjectOrTaskId(taskId);
  };

  const createTaskHandler = () => {
    const newTask = {
      taskName: newTaskName,
      completed: false,
      dueDate: new Date(),
      subtasks: [],
      _id: nanoid(),
    };

    createTask(newTask, currentProject._id);
  };

  useEffect(() => {
    const { completedItems, totalItems } = currentProject.tasks.reduce(
      (acc, task) => {
        // Check if the task itself is completed
        const isTaskCompleted = task.completed;

        // Check if all subtasks are completed
        const areAllSubtasksCompleted =
          task.subtasks.length > 0 &&
          task.subtasks.every((sub) => sub.completed);

        if (isTaskCompleted || areAllSubtasksCompleted) {
          acc.completedItems++; // Count this task as completed
        }

        acc.totalItems++; // Count total tasks

        return acc;
      },
      { completedItems: 0, totalItems: 0 },
    );

    const completionPercentage =
      totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

    return setCompletionPercentage(completionPercentage.toFixed(0));
  }, [currentProject]);

  return (
    <div className="min-h-full w-full p-4">
      {/* Header */}
      <div
        style={{
          backgroundImage: `url(${currentProject.backgroundImage})`,
        }}
        className="bg-light-gray relative mb-10 flex h-64 w-full justify-center rounded-3xl bg-cover bg-center"
      >
        <h1 className="text-custom-white absolute bottom-14 mx-2 max-w-[500px] px-4 text-center text-4xl font-bold underline decoration-2 underline-offset-5">
          {currentProject.projectName}
        </h1>
        <h1 className="text-custom-white ml-auto pt-2 pr-4 text-4xl font-semibold">
          {completionPercentage}%
        </h1>
        <div
          onClick={settingsButton}
          className="bg-light-transparent-gray hover:bg-light-transparent-gray-hover active:bg-light-transparent-gray text-light-text hover:text-default-text absolute top-0 left-0 flex h-10 w-40 cursor-pointer items-center justify-center gap-1.5 rounded-tl-3xl rounded-br-3xl"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <h3 className="text-base font-bold">Settings</h3>
        </div>
      </div>
      {/* Header */}

      {/* Description */}
      {currentProject.description ? (
        <div className="border-comment-blue-line bg-comment-blue-background m-auto w-10/12 border-l-4">
          <p className="p-5 text-left whitespace-pre-line">
            {currentProject.description}
          </p>
        </div>
      ) : null}
      {/* Description */}

      {/* Add New */}
      <div className="mt-16">
        <div className="relative mb-3">
          <input
            name="new task name"
            onChange={(e) => setNewTaskName(e.target.value)}
            autoComplete="off"
            className="text-light-text border-light-gray w-full rounded-2xl border py-2.5 pl-20 focus:outline-offset-2"
            placeholder="Add New Task"
            value={newTaskName}
          />
          <Plus
            onClick={newTaskName ? createTaskHandler : null}
            className="text-light-text border-light-gray hover:text-default-text absolute top-0 h-full w-12 cursor-pointer rounded-l-2xl border border-r bg-[#FBB19D] p-2"
          />
        </div>
        {/* Add New */}

        {/* Map Items */}
        <section className="flex flex-col rounded-2xl">
          {currentProject.tasks.map((task) => (
            <div
              key={task._id}
              className="bg-custom-white border-white-gray my-2.5 rounded-2xl border shadow-md"
            >
              <div className="border-light-gray flex h-12 w-full items-center justify-between border-b pl-10">
                <div className="flex items-center justify-between">
                  <h3 className="pb-1 text-xl font-semibold">
                    {task.taskName}
                  </h3>
                  <div>
                    <p className="text-light-text pl-2 text-xs font-light">
                      {task.date}
                    </p>
                  </div>
                </div>
                <Pencil
                  className="text-light-gray hover:text-dark-gray h-12 w-12 cursor-pointer p-2.5 duration-200"
                  onClick={() => taskButton(task._id)}
                />
              </div>
              {/* Map Tasks */}
              <div className="px-3">
                {task.subtasks.map((subtask, index) => (
                  <div
                    key={subtask._id}
                    className={`border-light-gray mx-auto border-b py-3 pl-16 ${index === task.subtasks.length - 1 ? 'border-b-0' : ''}`}
                  >
                    <h3 className="text-light-text">{subtask.subtaskName}</h3>
                  </div>
                ))}
              </div>
              {/* Map Tasks */}
            </div>
          ))}
        </section>
        {/* Map Items */}
      </div>
    </div>
  );
};

ProjectDisplayer.propTypes = {
  modalProject: PropTypes.bool.isRequired,
  setModalProject: PropTypes.func.isRequired,
  projectOrTaskId: PropTypes.string.isRequired,
  setProjectOrTaskId: PropTypes.func.isRequired,
};

export default ProjectDisplayer;
