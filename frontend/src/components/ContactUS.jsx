import ContactCard from "./ContactCard";
import adress from "../assets/location_6325110.png";
import phone from "../assets/telephone_8410788.png";
import email from "../assets/letter_11410308.png";
import socials from "../assets/socials.png";

const ContactUs = () => {
  return (
    <div className="md:p-4 bg-gray-800" id="contactus">
      <h2
        className="text-yellow-600 text-2xl md:text-5xl flex justify-center  pt-6 pb-4"
        style={{
          borderBottom: "1px solid",
          borderImage:
            "linear-gradient(to right, transparent, rgb(234, 179, 8), transparent) 1",
        }}
      >
        GET IN TOUCH:
      </h2>
      <div className="flex flex-col items-center md:flex-row mt-2 md:mt-10 pb-11">
        <ContactCard
          icon={adress}
          title="Address:"
          content="21115 I-45 Spring TX, 77388"
        />
        <ContactCard icon={phone} title="Phone:" content="346-812-8390 " />
        <ContactCard
          icon={email}
          title="Email:"
          content="asere.drivers@gmail.com"
        />
        <ContactCard
          icon={socials}
          title="Socials:"
          content="Facebook: Asere Drivers"
          contentline2="Instagram: Asere Transport"
        />
      </div>
    </div>
  );
};

export default ContactUs;
