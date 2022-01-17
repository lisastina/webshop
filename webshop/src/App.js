import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductDetails from "./pages/ProductDetails";
import AllProducts from "./pages/AllProducts";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="site-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/details/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation/:id" element={<Confirmation />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
