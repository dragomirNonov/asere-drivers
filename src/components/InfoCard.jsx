const InfoCard = ({ title, description, img, isLast }) => {
  const borderStyle = isLast ? "" : "md:border-r border-black";

  return (
    <div className={`md:bg-cayen-900 p-4 ${borderStyle}`}>
      <img
        src={img}
        className="h-6 w-auto md:h-8 w-auto filter invert hue-rotate-180 saturate-150"
        alt="Logo"
      />{" "}
      <h2 className="text-med md:text-lg text-yellow-500 font-semibold">
        {title}
      </h2>
      <p className="mt-1 text-sm md:mt-2 text-yellow-600">{description}</p>
    </div>
  );
};

export default InfoCard;
