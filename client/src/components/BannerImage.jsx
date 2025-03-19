const BannerImage = () => {
  const selectRandomImage = `/banners/banner-${Math.floor(Math.random() * 14) + 1}.jpeg`;

  return (
    <section className="border-light-gray hidden lg:block h-full w-full rounded-3xl border">
      <img
        src={selectRandomImage}
        alt="Banner image"
        className="h-full w-full rounded-3xl"
      />
    </section>
  );
};
export default BannerImage;
