import style from '../css/Navbar.module.css';
import { NavLink, useHistory } from 'react-router-dom';
import cartIcon from '../assets/icons/cart-icon.png';

const Navbar = () => {
    const history = useHistory();

    return ( 
        <div className={style.navbar}>
            <div className={style.linkContainer}>
                <div className={style.link}>
                    <NavLink exact to="/" activeClassName={style.active}>Home</NavLink></div>
                <div className={style.link}>
                    <NavLink exact to="/about" activeClassName={style.active}>About</NavLink>
                </div>
            </div>
            <div className={style.pageTitle}>
                <h1 onClick={() => history.push('/')}>LisaStina</h1>
            </div>
            <div className={style.cartIcon}>
                <span className={style.cartNumber}>0</span>
                <img src={cartIcon} alt="shopping cart icon"/>
            </div>
        </div>
     );
}
 
export default Navbar;