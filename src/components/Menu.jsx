import MenuButton from "./MenuButton";
import logo from "../assets/logo.png";

const Menu = () => {
  return (
    <nav className=" bg-cyan-900 p-4 sticky top-0 flex">
      <div className=" mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <img src={logo} className="h-12 w-auto" alt="Logo" />{" "}
            <span className="font-semibold text-xl text-yellow-500">
              ASERE Drivers CDL
            </span>
          </div>

          <div className=" lg:block">
            <div className="flex items-center">
              {/* Navigation items */}
              <MenuButton name="Home" link="#home" />
              <MenuButton name="About us" link="#aboutus" />
              <MenuButton name="FAQs" link="#faq" />
              <MenuButton name="Gallery" link="#gallery" />
              <MenuButton name="Contact Us" link="#contactus" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
