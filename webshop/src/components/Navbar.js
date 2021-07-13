import style from "../css/Navbar.module.css";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";

const Navbar = () => {
  const history = useHistory();
  const location = useLocation();
  const { cartItems: cart, cartLength, setCheckout } = useContext(CartContext);

  const [hamburger, setHamburger] = useState(false);

  return (
    <div
      className={`${style.navbar} ${
        location.pathname === "/" && !hamburger && style.white
      }`}
    >
      <div
        className={`${style.navbarContainer} ${hamburger && style.clickedHam}`}
      >
        <div className={style.linkContainer}>
          <div
            className={style.hamburger}
            onClick={() => setHamburger(!hamburger)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={style.link}>
            <NavLink
              exact
              to="/"
              activeClassName={style.active}
              onClick={() => setHamburger(false)}
            >
              Home
            </NavLink>
          </div>
          <div className={style.link}>
            <NavLink
              exact
              to="/about"
              activeClassName={style.active}
              onClick={() => setHamburger(false)}
            >
              About
            </NavLink>
          </div>
          <div className={style.link}>
            <NavLink
              exact
              to="/products"
              activeClassName={style.active}
              onClick={() => setHamburger(false)}
            >
              Shop
            </NavLink>
          </div>
        </div>

        <div className={style.pageTitle}>
          <h1
            onClick={() => {
              history.push("/");
              setHamburger(false);
            }}
          >
            LisaStina
          </h1>
        </div>
        <div className={style.cartIconWrapper}>
          <div
            className={style.cartIcon}
            onClick={() => {
              history.push("/checkout");
              setCheckout(false);
              setHamburger(false);
            }}
          >
            <div className={style.cartNumWrapper}>
              {cart.length > 0 && (
                <span className={style.cartNumber}>{cartLength}</span>
              )}
            </div>

            {location.pathname === "/" && !hamburger ? (
              <img
                src="/assets/icons/cart-icon-white.png"
                alt="shopping cart icon"
              />
            ) : (
              <img src="/assets/icons/cart-icon.png" alt="shopping cart icon" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
