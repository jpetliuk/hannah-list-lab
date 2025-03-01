import { useParams } from 'react-router-dom';
import useUserStore from '../../store/userStore';

import NotFound404Page from './NotFound404Page';

import ItemTaskPrinter from '../../components/ProjectPage/ItemTaskPrinter';
import { SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { useEffect } from 'react';

const ProjectPage = () => {
  const { projects } = useUserStore();
  const { id } = useParams();

  const [currentProject, setCurrentProject] = useState(false);

  useEffect(() => {
    const projectFound = projects.find((project) => project._id === id);

    setCurrentProject(projectFound);
  }, [projects, id]);

  return (
    <div className="border-outline bg-custom-white min-h-full w-full rounded-3xl border">
      {currentProject ? (
        <div className="min-h-full w-full p-4">
          <div
            style={{
              backgroundImage: `url(${currentProject.backgroundImage})`,
            }}
            className="relative flex h-64 w-full justify-center rounded-3xl bg-cover bg-center"
          >
            <h1 className="text-custom-white absolute bottom-14 mx-2 max-w-[500px] px-4 text-center text-4xl font-bold underline decoration-2 underline-offset-5">
              {currentProject.projectName}
            </h1>
            <div className="bg-light-transparent-gray hover:bg-light-transparent-gray-hover active:bg-light-transparent-gray text-light-text hover:text-default-text absolute top-0 left-0 flex h-10 w-40 cursor-pointer items-center justify-center gap-1.5 rounded-tl-3xl rounded-br-3xl">
              <SlidersHorizontal className="h-4 w-4" />
              <h3 className="text-base font-bold">Settings</h3>
            </div>
          </div>

          {currentProject.description ? (
            <div className="border-comment-blue-line bg-comment-blue-background m-auto mt-8 mb-16 max-w-10/12 border-l-4">
              <p className="p-5 text-left whitespace-pre-line">
                {currentProject.description}
              </p>
            </div>
          ) : null}

          <input
            autoComplete="off"
            className="text-light-text border-light-gray mb-3 w-full rounded-2xl border py-2.5 pl-10"
            placeholder="+    Add New Task"
          />
          <ItemTaskPrinter items={currentProject.items} />
        </div>
      ) : (
        <NotFound404Page />
      )}
    </div>
  );
};

export default ProjectPage;
