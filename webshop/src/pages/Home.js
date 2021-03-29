import ProductList from '../components/ProductList';
import style from '../css/Home.module.css';

const Home = () => {
    return ( 
        <div className={style.home}>
            <img src="/assets/imgs/header.jpg" alt="header"/>
            <div className="site-container">
                <div className={style.desc}>
                    <h2>An exploration in color and texture.</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis tellus in metus vulputate eu scelerisque felis imperdiet. Euismod elementum nisi quis eleifend quam. Vitae ultricies leo integer malesuada. Eu augue ut lectus arcu bibendum at. Non curabitur gravida arcu ac tortor dignissim.</p>
                    <button className="btn-sm">Learn more</button>
                </div>
                <ProductList />
            </div>
        </div>
     );
}
 
export default Home;