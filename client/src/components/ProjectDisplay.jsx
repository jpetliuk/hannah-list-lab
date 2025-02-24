import PropTypes from 'prop-types';

const ProjectDisplay = ({ project }) => {
  const projectBackground = project.backgroundImage;
  const projectName = project.projectName;
  const id = project._id;

  return (
    <div className="h-full w-full rounded-3xl bg-white">
      <div className="h-full w-full p-4">
        <div
          style={{ backgroundImage: `url(${projectBackground})` }}
          className="h-50 relative z-0 flex w-full justify-center rounded-3xl bg-cover bg-center"
        >
          <h1 className="absolute bottom-8 mx-2 max-w-[500px] px-4 text-center text-4xl font-bold text-white underline underline-offset-4 [text-shadow:2px_2px_2px_black]">
            {projectName}
          </h1>
          <button className="bg-light-transparent-gray hover:bg-light-transparent-gray-hover active:bg-light-transparent-gray-active text-light-text absolute left-0 top-0 z-10 flex h-10 w-40 cursor-pointer items-center justify-center rounded-br-3xl rounded-tl-3xl font-bold">
            Settings
          </button>
        </div>

        <h2>{id}</h2>
      </div>
    </div>
  );
};

ProjectDisplay.propTypes = {
  project: PropTypes.shape({
    backgroundImage: PropTypes.string,
    projectName: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default ProjectDisplay;
