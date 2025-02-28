const Logo = () => {
  return (
    <div className="border-outline bg-custom-white flex h-14 w-full items-center justify-center gap-2 rounded-3xl border">
      <img
        src="/icon.png"
        alt="icon description"
        className="w-9 rounded-full p-0"
      />
      <h1 className="text-default-text my-auto text-center text-lg font-bold">
        HANNAH&apos;S LIST LAB
      </h1>
    </div>
  );
};
export default Logo;
