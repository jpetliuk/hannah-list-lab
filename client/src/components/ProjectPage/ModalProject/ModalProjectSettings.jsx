import { useEffect, useState } from 'react';
import useUserStore from '../../../store/userStore';
import { Images } from 'lucide-react';

const ModalProjectSettings = () => {
  const { currentProject, saveProject, deleteProject } = useUserStore();
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
      currentProjectSettings.backgroundImage ===
        currentProject.backgroundImage &&
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
    <div
      style={{ height: 'calc(100% - 40px)' }}
      className="-mt-3.5 flex flex-col justify-between"
    >
      <div className="flex flex-col gap-5">
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
        </div>

        <div className="grid w-full grid-rows-1 gap-2">
          {/* <!-- First row --> */}
          <div className="grid h-35 grid-cols-[2fr_1fr] gap-2">
            <div
              className="border-light-gray h-35 rounded-2xl border bg-cover bg-[center_bottom_30%]"
              style={{
                backgroundImage: `url(${currentProjectSettings.backgroundImage})`,
              }}
            ></div>
            <div className="flex h-35 flex-col items-center justify-center">
              <h3 className="text-light-text">Upload Image:</h3>
              <div className="border-light-gray text-light-text hover:border-dark-gray hover:text-default-text h-fit w-fit cursor-pointer rounded-full border p-4 duration-200">
                <Images />
              </div>
            </div>
          </div>

          {/* <!-- Second row --> */}
          <div className="grid h-12.5 grid-cols-5 gap-2">
            <div
              onClick={() =>
                updateProjectSettings({
                  ...currentProjectSettings,
                  backgroundImage:
                    '/projectBackgrounds/egyptian-background.jpg',
                })
              }
              className="h-12.5 cursor-pointer rounded-2xl bg-cover bg-bottom duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                backgroundImage:
                  'url(/projectBackgrounds/egyptian-background.jpg)',
              }}
            ></div>
            <div
              onClick={() =>
                updateProjectSettings({
                  ...currentProjectSettings,
                  backgroundImage: '/projectBackgrounds/city-background.jpg',
                })
              }
              className="h-12.5 cursor-pointer rounded-2xl bg-cover bg-bottom duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                backgroundImage: 'url(/projectBackgrounds/city-background.jpg)',
              }}
            ></div>
            <div
              onClick={() =>
                updateProjectSettings({
                  ...currentProjectSettings,
                  backgroundImage:
                    '/projectBackgrounds/firewatch-background.jpg',
                })
              }
              className="h-12.5 cursor-pointer rounded-2xl bg-cover bg-bottom duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                backgroundImage:
                  'url(/projectBackgrounds/firewatch-background.jpg)',
              }}
            ></div>
            <div
              onClick={() =>
                updateProjectSettings({
                  ...currentProjectSettings,
                  backgroundImage:
                    '/projectBackgrounds/mountain-background.webp',
                })
              }
              className="h-12.5 cursor-pointer rounded-2xl bg-cover bg-bottom duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                backgroundImage:
                  'url(/projectBackgrounds/mountain-background.webp)',
              }}
            ></div>
            <div
              onClick={() =>
                updateProjectSettings({
                  ...currentProjectSettings,
                  backgroundImage: '/projectBackgrounds/tree-background.png',
                })
              }
              className="h-12.5 cursor-pointer rounded-2xl bg-cover bg-bottom duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                backgroundImage: 'url(/projectBackgrounds/tree-background.png)',
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Project Description */}
      <div>
        <h2 className="text-light-text pb-1 pl-4 text-2xl font-semibold">
          Description:
        </h2>
        <textarea
          autoComplete="off"
          className={`text-light-text border-light-gray max-h-40 w-full resize-none rounded-2xl border px-3 py-2 transition-all duration-300 ${
            currentProjectSettings.description === '' ? 'h-12' : 'h-40'
          }`}
          placeholder="Your project description"
          value={currentProjectSettings.description || ''}
          onChange={(e) => {
            updateProjectSettings({
              ...currentProjectSettings,
              description: e.target.value,
            });
          }}
        />
      </div>

      {/* Due Date */}
      <div className="flex items-center justify-around">
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
          onClick={() => deleteProject(currentProject._id)}
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
