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
                <div className={style.cartIconWrapper}>
                    <div className={style.cartIcon}onClick={() => {
                    history.push('/checkout')
                }}>
                        <div className={style.cartNumWrapper}>
                            <span className={style.cartNumber}>4</span>
                        </div>
                        
                        {location.pathname === "/" ?
                        <img src="/assets/icons/cart-icon-white.png" alt="shopping cart icon"/> 
                        : 
                        <img src="/assets/icons/cart-icon.png" alt="shopping cart icon"/>
                        }
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Navbar;