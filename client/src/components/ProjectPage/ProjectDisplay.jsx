/* eslint-disable react/prop-types */
import ItemTaskPrinter from './ItemTaskPrinter';

const ProjectDisplay = ({ project }) => {
  return (
    <div className="border-outline bg-custom-white min-h-full w-full rounded-3xl border">
      <div className="min-h-full w-full p-4">
        <div
          style={{ backgroundImage: `url(${project.backgroundImage})` }}
          className="relative flex h-64 w-full justify-center rounded-3xl bg-cover bg-center"
        >
          <h1 className="text-custom-white decoration-2 underline-offset-5 absolute bottom-14 mx-2 max-w-[500px] px-4 text-center text-4xl font-bold underline">
            {project.projectName}
          </h1>
          <div className="bg-light-transparent-gray hover:bg-light-transparent-gray-hover active:bg-light-transparent-gray-active text-light-text absolute left-0 top-0 flex h-10 w-40 cursor-pointer items-center justify-center gap-1.5 rounded-br-3xl rounded-tl-3xl">
            <img
              src="/banner-image.jpeg"
              alt="settings"
              className="h-3 w-3 rounded-3xl"
            />
            <h3 className="text-base font-bold">Settings</h3>
          </div>
        </div>

        {project.description ? (
          <div className="border-comment-blue-line bg-comment-blue-background max-w-10/12 m-auto mb-16 mt-8 border-l-4">
            <p className="whitespace-pre-line p-5 text-left">
              {project.description}
            </p>
          </div>
        ) : null}

        <input
          className="text-light-text border-light-gray mb-3 w-full rounded-2xl border py-2.5 pl-10"
          placeholder="+    Add New Task"
        ></input>
        <ItemTaskPrinter items={project.items} />
      </div>
    </div>
  );
};

export default ProjectDisplay;
