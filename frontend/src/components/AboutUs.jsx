import yard from "../assets/yard.jpg";

const AboutUS = () => {
  return (
    <div className="flex p-4 ">
      <div className="w-1/2 p-4 flex flex-col items-center">
        <div className="w-4/6 flex flex-col items-center">
          <h2
            className="text-yellow-500 text-5xl font-bold pb-4"
            style={{
              borderBottom: "1px solid",
              borderImage:
                "linear-gradient(to right, transparent, rgb(234, 179, 8), transparent) 1",
            }}
          >
            About Us:
          </h2>

          <p
            className="text-yellow-800 text-xl pt-2"
            style={{ lineHeight: "2" }}
          >
            At ASERE Drivers, we're dedicated to delivering top-notch CDL
            Training services. With a focus on innovation and customer
            satisfaction, we strive to exceed expectations every time. Founded
            in 2008, we've quickly become a trusted industry provider, known for
            our excelent service and high graduation rate. Our team is
            passionate about providing the best training possible. From CLP to
            becoming your own boss, we're committed to providing exceptional
            results. Thank you for choosing Asere Drivers. We look forward to
            serving you!
          </p>
        </div>
      </div>

      <div className="w-1/2 flex justify-center">
        <img src={yard} className="w-4/6 m-4 rounded-lg" alt="Truck" />
      </div>
    </div>
  );
};

export default AboutUS;
