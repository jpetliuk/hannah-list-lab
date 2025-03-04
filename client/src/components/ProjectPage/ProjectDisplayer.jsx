import { SlidersHorizontal, Plus, Pencil } from 'lucide-react';
import PropTypes from 'prop-types';

import userStore from '../../store/userStore';

const ProjectDisplayer = ({
  modalProject,
  setModalProject,
  projectOrTaskId,
  setProjectOrTaskId,
}) => {
  const { currentProject } = userStore();

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
            autoComplete="off"
            className="text-light-text border-light-gray w-full rounded-2xl border py-2.5 pl-20 focus:outline-offset-2"
            placeholder="Add New Task"
          />
          <Plus className="text-light-text border-light-gray hover:text-default-text absolute top-0 h-full w-12 cursor-pointer rounded-l-2xl border border-r bg-[#FBB19D] p-2" />
        </div>
        {/* Add New */}

        {/* Map Items */}
        {currentProject.tasks.map((task) => (
          <div key={task._id}>
            <div className="border-light-gray w-full border-b py-3 pl-10">
              <div className="flex items-center justify-between">
                <h3 className="pb-1 text-xl font-semibold">{task.taskName}</h3>
                <Pencil
                  size={22}
                  className="text-light-text hover:text-default-text cursor-pointer"
                  onClick={() => taskButton(task._id)}
                />
              </div>
              <div>
                <p className="text-light-text pl-2 text-xs font-light">
                  {task.date}
                </p>
              </div>
            </div>
            {/* Map Tasks */}
            <div className="px-3">
              {task.subtasks.map((subtask) => (
                <div
                  key={subtask._id}
                  className="border-light-gray mx-auto border-b py-4 pl-20"
                >
                  <h3 className="text-light-text">{subtask.subtaskName}</h3>
                </div>
              ))}
              {/* Map Tasks */}
            </div>
          </div>
        ))}
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
