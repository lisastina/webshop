import style from '../css/Navbar.module.css';
import { NavLink, useHistory } from 'react-router-dom';

const Navbar = () => {
    return ( 
        <div className={style.navbar}>
            <NavLink exact to="/">Home</NavLink>
            <NavLink exact to="/about">About</NavLink>
        </div>
     );
}
 
export default Navbar;