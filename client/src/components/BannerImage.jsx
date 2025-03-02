const BannerImage = () => {
  const selectRandomImage = `/banners/banner-${Math.floor(Math.random() * 14) + 1}.jpeg`;

  return (
    <div className="border-light-gray h-full w-full rounded-3xl border">
      <img
        src={selectRandomImage}
        alt="Banner image"
        className="h-full w-full rounded-3xl"
      />
    </div>
  );
};
export default BannerImage;
