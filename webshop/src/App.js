
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Route exact path="/" component={Home} />
        <div className="site-container">
          <Route exact path="/about" component={About} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
