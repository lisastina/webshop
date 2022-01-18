import style from "../css/Navbar.module.css";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { useAuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { currentUser } = useAuthContext();
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
              to="/"
              activeclassname={style.active}
              onClick={() => setHamburger(false)}
            >
              Home
            </NavLink>
          </div>
          <div className={style.link}>
            <NavLink
              to="/about"
              activeclassname={style.active}
              onClick={() => setHamburger(false)}
            >
              About
            </NavLink>
          </div>
          <div className={style.link}>
            <NavLink
              to="/products"
              activeclassname={style.active}
              onClick={() => setHamburger(false)}
            >
              Shop
            </NavLink>
          </div>
          {currentUser && (
            <div className={style.link}>
              <NavLink
                to="/admin"
                activeclassname={style.active}
                onClick={() => setHamburger(false)}
              >
                Admin
              </NavLink>
            </div>
          )}
        </div>

        <div className={style.pageTitle}>
          <Link to="/">
            <h1
              onClick={() => {
                setHamburger(false);
              }}
            >
              LisaStina
            </h1>
          </Link>
        </div>
        <div className={style.cartIconWrapper}>
          <Link
            to="/checkout"
            className={style.cartIcon}
            onClick={() => {
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
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
