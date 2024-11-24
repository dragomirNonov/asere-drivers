import Navbar from '../components/homePage/Navbar';
import Info from '../components/homePage/Info';
import AboutUS from '../components/homePage/AboutUs';
import FAQs from '../components/homePage/FAQs';
import Gallery from '../components/homePage/Gallery';
import ContactUs from '../components/homePage/ContactUS';
import GoogleMap from '../components/homePage/GoogleMap';

import truck from '../assets/truck.jpg';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <img src={truck} className="w-auto h-100" alt="Truck" id="home" />
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
