import Menu from "./components/Menu";
import truck from "./assets/truck.jpg";
import Info from "./components/Info";
import AboutUS from "./components/AboutUs";
import FAQs from "./components/FAQs";
import ContactUs from "./components/ContactUS";
import GoogleMap from "./components/GoogleMap";
import Gallery from "./components/Gallery";

export default function App() {
  return (
    <div className="bg-slate-200">
      <Menu />
      <img src={truck} className="w-auto h-100" alt="Truck" id="home" />
      <Info />
      <AboutUS />
      <FAQs />
      <Gallery />
      <ContactUs />
      <GoogleMap />
    </div>
  );
}
