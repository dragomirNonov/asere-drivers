import Menu from "./components/Menu";
import truck from "./assets/truck.jpg";
import Info from "./components/Info";
import AboutUS from "./components/AboutUs";
import FAQs from "./components/FAQs";

export default function App() {
  return (
    <div className="bg-slate-400">
      <Menu />
      <img src={truck} className="w-auto h-100" alt="Truck" />
      <Info />
      <AboutUS />
      <FAQs />
    </div>
  );
}
