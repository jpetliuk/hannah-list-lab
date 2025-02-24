/* eslint-disable react/prop-types */

const TaskLoader = ({ tasks }) => {
  return (
    <>
      {tasks.map((task) => (
        <div
          key={task._id}
          className="border-light-gray pl-20 mx-auto border-b py-3"
        >
          <h3 className="text-light-text">{task.taskName}</h3>
        </div>
      ))}
    </>
  );
};

const ItemTaskPrinter = ({ items }) => {
  return (
    <>
      {items.map((item) => (
        <div key={item._id}>
          <div className="pl-15 border-light-gray w-full border-b py-3">
            <h3 className="pb-1 text-xl font-semibold">{item.itemName}</h3>
            <div>
              <p className="text-light-text pl-2 text-xs">{item.date}</p>
            </div>
          </div>

          <div className="px-3">
            <TaskLoader tasks={item.tasks} />
          </div>
        </div>
      ))}
    </>
  );
};

export default ItemTaskPrinter;
