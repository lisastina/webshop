import style from '../css/Navbar.module.css';
import { NavLink, useHistory, useLocation } from 'react-router-dom';

const Navbar = () => {
    const history = useHistory();
    const location = useLocation();
 
    return ( 
        <div className={`${style.navbar} ${location.pathname === "/" && style.white}`}>
            <div className={style.navbarContainer}>
                <div className={style.linkContainer}>
                    <div className={style.link}>
                        <NavLink exact to="/" activeClassName={style.active}>Home</NavLink></div>
                    <div className={style.link}>
                        <NavLink exact to="/about" activeClassName={style.active}>About</NavLink>
                    </div>
                    <div className={style.link}>
                        <NavLink exact to="/products" activeClassName={style.active}>Shop</NavLink>
                    </div>
                </div>
                <div className={style.pageTitle}>
                    <h1 onClick={() => history.push('/')}>LisaStina</h1>
                </div>
                <div className={style.cartIcon}>
                    <span className={style.cartNumber}>0</span>
                    <img src="/assets/icons/cart-icon.png" alt="shopping cart icon"/>
                </div>
            </div>
        </div>
     );
}
 
export default Navbar;