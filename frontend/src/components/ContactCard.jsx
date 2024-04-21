const ContactCard = ({ icon, title, content, contentline2 }) => {
  return (
    <div className="pt-2 md:w-2/6 flex flex-col items-center ">
      <img src={icon} className="h-10 w-10 md:h-20 md:w-20" alt="Logo" />{" "}
      <h2 className="font-bold text-yellow-500 md:text-3xl mt-2">{title}</h2>
      <p className=" md:text-xl text-yellow-700">{content}</p>
      <p className=" md:text-xl text-yellow-700">{contentline2}</p>
    </div>
  );
};

export default ContactCard;
