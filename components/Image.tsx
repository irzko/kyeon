const Image = ({ src, alt }: { src: string | undefined; alt: string }) => {
  return (
    <div>
      <picture>
        <img
          className="h-auto max-w-full rounded-2xl"
          src={src}
          alt={alt}
        ></img>
      </picture>
    </div>
  );
};

export default Image;
