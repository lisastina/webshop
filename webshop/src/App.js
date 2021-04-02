
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar';
import ProductContext from './contexts/ProductContext';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProductDetails from './pages/ProductDetails';
import AllProducts from './pages/AllProducts';
import Checkout from './pages/Checkout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ScrollToTop />
        <Navbar />
        <ProductContext>
          <Route exact path="/" component={Home} />
          <div className="site-container">
            <Route exact path="/about" component={About} />
            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/details/:id" component={ProductDetails} />
            <Route exact path="/checkout" component={Checkout} />
          </div>
        </ProductContext>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
