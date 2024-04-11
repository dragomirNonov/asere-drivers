import MenuButton from "./MenuButton";
import logo from "../assets/logo.png";

const Menu = () => {
  return (
    <nav className="bg-cyan-900 p-4">
      <div className="max-w-8xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            {/* You can place your logo or site title here */}
            <img src={logo} className="h-12 w-auto" alt="Logo" />{" "}
            {/* Adjust the height and width as needed */}
            <span className="font-semibold text-xl text-yellow-500">
              ASERE Drivers
            </span>
          </div>

          <div className=" lg:block">
            <div className="flex items-center">
              {/* Navigation items */}
              <MenuButton name="Home" />
              <MenuButton name="About us" />
              <MenuButton name="FAQs" />
              <MenuButton name="Contact Us" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
