import { useEffect, useState } from 'react';
import useUserStore from '../../../store/userStore';

const ModalProjectSettings = () => {
  const { currentProject, saveProject } = useUserStore();
  const [currentProjectSettings, setCurrentProjectSettings] = useState(null);

  // update state of currentProjectSettings
  const updateProjectSettings = (updatedSettings) => {
    setCurrentProjectSettings(updatedSettings);
  };

  // saves currentProjectSettings to the currentProject
  const saveNewProject = () => {
    //validates if there are any changes made
    if (
      currentProjectSettings.projectName === currentProject.projectName &&
      currentProjectSettings.description === currentProject.description &&
      currentProjectSettings.dueDate === currentProject.dueDate &&
      currentProjectSettings.color === currentProject.color
    )
      return console.log('No changes made');

    saveProject({ ...currentProjectSettings });
    console.log(currentProjectSettings);
  };

  // sets currentProjectSettings to the currentProject from the store (id of project from params)
  useEffect(() => {
    setCurrentProjectSettings(currentProject || null);
  }, [currentProject]);

  if (currentProjectSettings === null) return <div>error</div>;

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

export default ModalProjectSettings;
