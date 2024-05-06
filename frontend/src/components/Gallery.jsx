import Picture from "./Picture";
import Pic1 from "../assets/studentPictures/PHOTO-2022-03-25-08-36-45.jpg";
// import Pic2 from "../assets/studentPictures/PHOTO-2022-04-06-11-49-09.jpg";
import Pic3 from "../assets/studentPictures/PHOTO-2022-04-13-10-34-23.jpg";
import Pic4 from "../assets/studentPictures/PHOTO-2022-04-14-10-20-46.jpg";
import Pic5 from "../assets/studentPictures/PHOTO-2022-04-14-15-16-58.jpg";
import Pic6 from "../assets/studentPictures/PHOTO-2022-04-18-08-57-59.jpg";
import Pic7 from "../assets/studentPictures/PHOTO-2022-04-18-10-12-58.jpg";
import Pic8 from "../assets/studentPictures/PHOTO-2022-04-20-14-54-44.jpg";
import Pic9 from "../assets/studentPictures/PHOTO-2022-04-20-16-36-34.jpg";
// import Pic10 from "../assets/studentPictures/PHOTO-2022-04-20-16-48-20.jpg";
import Pic11 from "../assets/studentPictures/PHOTO-2022-04-28-19-43-38.jpg";
import Pic12 from "../assets/studentPictures/PHOTO-2022-04-28-19-44-40.jpg";
import Pic13 from "../assets/studentPictures/PHOTO-2022-04-29-14-00-32.jpg";
import Pic14 from "../assets/studentPictures/PHOTO-2022-04-29-14-33-00.jpg";
import Pic15 from "../assets/studentPictures/PHOTO-2022-05-02-13-42-52.jpg";
import Pic16 from "../assets/studentPictures/PHOTO-2022-05-02-14-13-52.jpg";
import Pic17 from "../assets/studentPictures/PHOTO-2022-05-03-15-53-59.jpg";
import Pic18 from "../assets/studentPictures/PHOTO-2022-05-04-11-28-37.jpg";
import Pic19 from "../assets/studentPictures/PHOTO-2022-05-04-14-19-07.jpg";
import Pic20 from "../assets/studentPictures/PHOTO-2022-04-20-16-36-34.jpg";
// import Pic10 from "../assets/studentPictures/PHOTO-2022-04-20-16-48-20.jpg";

const picturePaths = [
  Pic1,
  Pic3,
  Pic4,
  Pic5,
  Pic6,
  Pic7,
  Pic8,
  Pic9,
  Pic11,
  Pic12,
  Pic13,
  Pic14,
  Pic15,
  Pic16,
  Pic17,
  Pic18,
  Pic19,
  Pic20,
];

const Gallery = () => {
  return (
    <div id="gallery" className=" bg-slate-100">
      <h2
        className="text-yellow-600  text-2xl md:text-5xl flex justify-center pb-4 pt-6"
        style={{
          borderBottom: "1px solid",
          borderImage:
            "linear-gradient(to right, transparent, rgb(234, 179, 8), transparent) 1",
        }}
      >
        GALLERY:
      </h2>
      <div className="flex">
        {picturePaths.slice(0, 8).map((image, index) => (
          <Picture key={index} pic={image} />
        ))}
      </div>
      <div className="flex">
        {picturePaths.slice(9, 17).map((image, index) => (
          <Picture key={index} pic={image} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
