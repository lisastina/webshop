import ProductList from '../components/ProductList';
import style from '../css/Home.module.css';
import { NavLink } from 'react-router-dom';

const Home = () => {
    return ( 
        <div className={style.home}>
            <img src="/assets/imgs/header.jpg" alt="header"/>
            <div className="site-container">
                <div className={style.desc}>
                    <h2>An exploration in color and texture.</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis tellus in metus vulputate eu scelerisque felis imperdiet. Euismod elementum nisi quis eleifend quam. Vitae ultricies leo integer malesuada. Eu augue ut lectus arcu bibendum at. Non curabitur gravida arcu ac tortor dignissim.</p>
                    <NavLink exact to="/about"><button className="btn-sm">Learn more</button></NavLink>
                </div>
                <ProductList />
                <div className={style.seeAll}>
                    <NavLink exact to="/about">View all items</NavLink>
                </div>
            </div>
        </div>
     );
}
 
export default Home;