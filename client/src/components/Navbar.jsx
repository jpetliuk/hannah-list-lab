const Navbar = () => {
  return (
    <div className="flex h-full w-full flex-col justify-between rounded-3xl bg-white p-3">
      <div>
        <div className="border-white-gray flex w-full items-center gap-3 border-b pb-4">
          <img
            src="/banner-image.jpeg"
            alt="user icon photo"
            className="h-10 w-10 rounded-full object-cover"
          />
          <h2 className="text-default-text text-base font-semibold">
            Welcome Hannah!
          </h2>
        </div>

        <div className="border-white-gray mt-2 flex w-full flex-col gap-1 border-b pb-4">
          <h2 className="text-default-text text-base font-semibold">Tools</h2>

          <div className="hover:bg-white-gray flex w-full cursor-pointer items-center gap-2 rounded-3xl py-1.5 pl-4">
            <img
              src="/banner-image.jpeg"
              alt="user icon photo"
              className="h-5 w-5 rounded-full object-cover"
            />
            <h3 className="text-light-text text-sm font-light">Home</h3>
          </div>

          <div className="hover:bg-white-gray flex w-full cursor-pointer items-center gap-2 rounded-3xl py-1.5 pl-4">
            <img
              src="/banner-image.jpeg"
              alt="user icon photo"
              className="h-5 w-5 rounded-full object-cover"
            />
            <h3 className="text-light-text text-sm font-light">Calendar</h3>
          </div>

          <div className="hover:bg-white-gray flex w-full cursor-pointer items-center gap-2 rounded-3xl py-1.5 pl-4">
            <img
              src="/banner-image.jpeg"
              alt="user icon photo"
              className="h-5 w-5 rounded-full object-cover"
            />
            <h3 className="text-light-text text-sm font-light">Sticky notes</h3>
          </div>

          <div className="hover:bg-white-gray flex w-full cursor-pointer items-center gap-2 rounded-3xl py-1.5 pl-4">
            <img
              src="/banner-image.jpeg"
              alt="user icon photo"
              className="h-5 w-5 rounded-full object-cover"
            />
            <h3 className="text-light-text text-sm font-light">
              Task progress
            </h3>
          </div>
        </div>

        <div className="border-white-gray mt-2 flex w-full flex-col gap-1 border-b pb-4">
          <h2 className="text-default-text text-base font-semibold">
            My Projects
          </h2>

          <div className="hover:bg-white-gray flex w-full cursor-pointer items-center gap-2 rounded-3xl py-1.5 pl-4">
            <img
              src="/banner-image.jpeg"
              alt="user icon photo"
              className="h-5 w-5 rounded-full object-cover"
            />
            <h3 className="text-light-text text-sm font-light">
              Research Paper Publication
            </h3>
          </div>

          <div className="hover:bg-white-gray flex w-full cursor-pointer items-center gap-2 rounded-3xl py-1.5 pl-4">
            <img
              src="/banner-image.jpeg"
              alt="user icon photo"
              className="h-5 w-5 rounded-full object-cover"
            />
            <h3 className="text-light-text text-sm font-light">
              Research Paper Publication
            </h3>
          </div>
        </div>
      </div>

      <div className="border-white-gray flex w-full flex-col gap-1 border-t">
        <div className="hover:bg-white-gray flex w-full cursor-pointer items-center justify-center gap-2 rounded-3xl py-1.5">
          <img
            src="/banner-image.jpeg"
            alt="user icon photo"
            className="h-5 w-5 rounded-full object-cover"
          />
          <h3 className="text-light-text text-sm font-light">Settings</h3>
        </div>

        <div className="hover:bg-white-gray flex w-full cursor-pointer items-center justify-center gap-2 rounded-3xl py-1.5">
          <img
            src="/banner-image.jpeg"
            alt="user icon photo"
            className="h-5 w-5 rounded-full object-cover"
          />
          <h3 className="text-light-text text-sm font-light">Sign-out</h3>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
