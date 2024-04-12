const ContactCard = ({ icon, title, content, contentline2 }) => {
  return (
    <div className="w-2/6 flex flex-col items-center">
      <img src={icon} className="h-20 w-20" alt="Logo" />{" "}
      <h2 className="font-bold text-yellow-500 text-3xl mt-2">{title}</h2>
      <p className=" text-xl text-yellow-700">{content}</p>
      <p className=" text-xl text-yellow-700">{contentline2}</p>
    </div>
  );
};

export default ContactCard;
