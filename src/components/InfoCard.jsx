const InfoCard = ({ title, description, img, isLast }) => {
  const borderStyle = isLast ? "" : "border-r border-black";

  return (
    <div className={`bg-cayen-900 p-4 ${borderStyle}`}>
      <img src={img} className="h-8 w-auto" alt="Logo" />{" "}
      <h2 className="text-lg text-yellow-500 font-semibold">{title}</h2>
      <p className="mt-2 text-yellow-600">{description}</p>
    </div>
  );
};

export default InfoCard;
