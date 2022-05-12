import style from "../css/Navbar.module.css";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { useAuthContext } from "../contexts/AuthContext";
import useLocalStorage from "../hooks/useLocalStorage";

const Navbar = () => {
  const { currentUser } = useAuthContext();
  const location = useLocation();
  const { cartItems: cart, cartLength, setCheckout } = useContext(CartContext);
  // eslint-disable-next-line
  const [activeLink, setActiveLink] = useLocalStorage(
    "activeLinkAdmin",
    "editProducts"
  );

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
          {/* Links */}
          {[
            { to: "/", title: "Home" },
            { to: "/about", title: "About" },
            { to: "/shop", title: "Shop" },
            { to: "/admin", title: "Admin", protected: true },
          ].map((link, i) => {
            const linkEl = (
              <div className={style.link} key={i}>
                <NavLink
                  to={link.to}
                  className={location.pathname === link.to && style.active}
                  onClick={() => {
                    setHamburger(false);
                    setActiveLink("editProducts");
                  }}
                >
                  {link.title}
                </NavLink>
              </div>
            );

            if (link.protected && !currentUser) {
              return null;
            }
            return linkEl;
          })}
        </div>

        {/* Page title */}
        <div className={style.pageTitle}>
          <Link to="/">
            <h1
              onClick={() => {
                setHamburger(false);
                setActiveLink("editProducts");
              }}
            >
              LisaStina
            </h1>
          </Link>
        </div>
        {/* Cart */}
        <div className={style.cartIconWrapper}>
          <Link
            to="/checkout"
            className={style.cartIcon}
            onClick={() => {
              setCheckout(false);
              setHamburger(false);
              setActiveLink("editProducts");
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
