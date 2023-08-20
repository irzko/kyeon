import Image from "./Image";

const Gallery = () => {
  const images = [
    "https://i.imgur.com/nGU0CwF.jpg",
    "https://i.imgur.com/ECu028Z.jpg",
    "https://i.imgur.com/XIYUMv1.jpg",
    "https://i.imgur.com/GS4QlEm.jpeg",
    "https://i.imgur.com/r9togVU.jpeg",
    "https://i.imgur.com/Pd7IrzM.jpeg",
    "https://i.imgur.com/TDvvIBc.jpeg",
  ];
  return (
    <div className="grid grid-cols-2 gap-2 bg-white px-2 py-12 rounded-t-3xl shadow-2xl">
      <div className="flex flex-col gap-2">
        {images.map(
          (image, index) =>
            index % 2 === 0 && <Image key={index} src={image} alt="" />
        )}
      </div>
      <div className="flex flex-col gap-2">
        {images.map(
          (image, index) =>
            index % 2 !== 0 && <Image key={index} src={image} alt="" />
        )}
      </div>
    </div>
  );
};

export default Gallery;
