import { X } from 'lucide-react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import useUserStore from '../../store/userStore';

const ProjectSettings = () => {
  const { currentProject, saveProjectSettings } = useUserStore();

  const [currentProjectSettings, setCurrentProjectSettings] = useState(null);

  const updateProjectSettings = (updatedSettings) => {
    setCurrentProjectSettings(updatedSettings);
  };

  useEffect(() => {
    setCurrentProjectSettings(currentProject);
  }, [currentProject]);

  if (!currentProjectSettings) return;

  const saveNewProjectSettings = () => {
    saveProjectSettings({ ...currentProjectSettings });
  };

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
          onClick={saveNewProjectSettings}
          className="bg-button-yellow text-default-text hover:bg-button-yellow-hover active:bg-button-yellow h-11 w-40 cursor-pointer rounded-2xl font-semibold"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

const ProjectItem = ({ projectOrItem }) => {
  // note: projectOrItem === item._id
  const { currentProject } = useUserStore();
  const [currentItem, setCurrentItem] = useState(null);

  const updateProjectItem = (updatedItem) => {
    setCurrentItem(updatedItem);
  };

  useEffect(() => {
    const itemFound = currentProject.items.find(
      (item) => item._id === projectOrItem,
    );

    console.log(itemFound);

    setCurrentItem(itemFound || null);
  }, [currentProject.items, projectOrItem]);

  if (!currentItem) return;

  return (
    <div className="-mt-3.5 flex flex-col gap-5">
      {/* Task Title */}
      <div>
        <h2 className="text-light-text pb-1 pl-4 text-2xl font-semibold">
          Task:
        </h2>
        <input
          name="project-title"
          type="text"
          autoComplete="off"
          className="text-light-text border-light-gray w-full rounded-2xl border py-2.5 pl-10"
          placeholder="Project name"
          maxLength={35}
          value={currentItem.itemName || ''}
          onChange={(e) =>
            updateProjectItem({ ...currentItem, itemName: e.target.value })
          }
        />
      </div>

      {/* Task Due Date */}
      <div className="flex items-center justify-center gap-3">
        <h2 className="text-light-text pb-1 pl-4 text-base font-normal">
          Due date:
        </h2>
        <input
          autoComplete="off"
          className="text-light-text border-light-gray w-20 rounded-lg border"
          placeholder="Project name"
          value={currentItem.dueDate || ''}
          onChange={(e) =>
            updateProjectItem({ ...currentItem, dueDate: e.target.value })
          }
        />
      </div>

      {/* Subtasks */}
      <div>
        <h2 className="text-light-text pb-1 pl-4 text-2xl font-semibold">
          Subtasks:
        </h2>
        <div className="h-40 w-full border">
          {currentItem.tasks.map((subtask) => (
            <h1 key={subtask._id}>{subtask.taskName}</h1>
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
          onClick={''}
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
  projectOrItem,
}) => {
  return (
    <div
      style={
        modalProject
          ? {
              width: `${parentWidth / 2 - 20}px`,
              minWidth: `${parentWidth / 2 - 20}px`,
            }
          : { width: 0, minWidth: 0 }
      }
      className="min-h-full overflow-hidden duration-600 ease-in-out"
    >
      <div
        style={{
          minWidth: `${parentWidth / 2 - 20}px`,
          width: `${parentWidth / 2 - 20}px`,
        }}
        className="border-outline bg-custom-white min-h-full max-w-full rounded-3xl border p-3"
      >
        <X
          onClick={() => setModalProject(false)}
          className="text-light-text hover:text-default-text ml-auto h-10 w-10 cursor-pointer"
        />

        {projectOrItem === 'project' ? (
          <ProjectSettings />
        ) : (
          <ProjectItem projectOrItem={projectOrItem} />
        )}
      </div>
    </div>
  );
};

ModalProjectSettings.propTypes = {
  parentWidth: PropTypes.number.isRequired,
  projectOrItem: PropTypes.string.isRequired,
  modalProject: PropTypes.bool.isRequired,
  setModalProject: PropTypes.func.isRequired,
};

ProjectItem.propTypes = {
  projectOrItem: PropTypes.string.isRequired,
};

export default ModalProjectSettings;
