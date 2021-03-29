import headerImg from '../assets/imgs/header.jpg';
import ProductList from '../components/ProductList';

const Home = () => {
    return ( 
        <div className="home">
            <img src={headerImg} alt="header"/>
            <div className="site-container">
                <ProductList />
            </div>
        </div>
     );
}
 
export default Home;