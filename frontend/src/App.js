import Landing from "./pages/Landing";
import Catalogue from "./pages/Catalogue/Catalogue";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Cart from "./pages/Cart/Cart";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Catalogue />
      <Footer/>
    </div>
  );
}

export default App;
