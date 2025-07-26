import Navbar from "./components/navBar";
import Hero from "./components/hero";
import Consulting from "./components/consulting";
import CatalogoImoveis from "./components/CatalogoImoveis";
import Vantagens from "./components/Advantages";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
    <Navbar />
    <Hero />
    <Consulting />
    <Vantagens />
    <CatalogoImoveis />
    <Contact />
    <Footer />
    </>
  );
}
