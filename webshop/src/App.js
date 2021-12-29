import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import ProductContext from "./contexts/ProductContext";
import CartContext from "./contexts/CartContext";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ProductDetails from "./pages/ProductDetails";
import AllProducts from "./pages/AllProducts";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <ProductContext>
          <CartContext>
            <Navbar />
            <div className="site-container">
              <Route exact path="/" component={Home} />
              <div className="pages-container">
                <Route exact path="/about" component={About} />
                <Route exact path="/products" component={AllProducts} />
                <Route exact path="/details/:id" component={ProductDetails} />
                <Route exact path="/checkout" component={Checkout} />
                <Route
                  exact
                  path="/confirmation/:id"
                  component={Confirmation}
                />
              </div>
            </div>
          </CartContext>
        </ProductContext>
        <Footer />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </div>
  );
}

export default App;
