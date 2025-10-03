import PropTypes from 'prop-types';

const ProjectCardComponent = ({ projectName, backgroundImage, iconColor }) => {
  return (
    <div className="bg-neutral-8 dark:bg-neutral-3 hover:shadow-drop-3 shadow-drop-2 h-40 w-40 cursor-pointer overflow-clip rounded-2xl duration-200 hover:scale-105">
      <div
        className="relative h-1/2 w-full bg-cover"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <p
          className={`absolute top-3/4 left-2 stroke-3 text-4xl font-bold`}
          style={{ color: `${iconColor}` }}
        >
          #
        </p>
      </div>
      <div className="h-1/2 w-full px-2.5 pt-4">
        <h2 className="text-neutral-2 dark:text-neutral-9 line-clamp-2 text-center">
          {projectName}
        </h2>
      </div>
    </div>
  );
};

ProjectCardComponent.propTypes = {
  backgroundImage: PropTypes.string,
  projectName: PropTypes.string,
  iconColor: PropTypes.string,
};

export default ProjectCardComponent;
