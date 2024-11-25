import Navbar from '../components/homeUI/Navbar';
import Info from '../components/homeUI/Info';
import AboutUS from '../components/homeUI/AboutUs';
import FAQs from '../components/homeUI/FAQs';
import Gallery from '../components/homeUI/Gallery';
import ContactUs from '../components/homeUI/ContactUS';
import GoogleMap from '../components/homeUI/GoogleMap';

import truck from '../assets/truck.jpg';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <img src={truck} className="w-full h-100" alt="Truck" id="home" />
      <Info />
      <AboutUS />
      <FAQs />
      <Gallery />
      <ContactUs />
      <GoogleMap />
    </div>
  );
};

export default HomePage;
