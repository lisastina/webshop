import style from "../css/Checkout.module.css";
import { useContext, useEffect } from "react";
import { CartContext } from "../contexts/CartContext";
import CartItem from "../components/CartItem";
import NoItems from "../components/NoItems";
import PlaceOrder from "../components/PlaceOrder";

const Checkout = () => {
  const { cartItems, cartTotal, checkout, setCheckout } =
    useContext(CartContext);

  useEffect(() => {
    setCheckout(false);
  }, [setCheckout]);

  const handleCheckout = (e) => {
    e.preventDefault();
    setCheckout(!checkout);
  };

  return (
    <div>
      {cartItems.length ? (
        <div className={style.checkout}>
          {checkout ? <h1>Checkout</h1> : <h1>Shopping cart</h1>}
          {cartItems &&
            cartItems.map((item, index) => (
              <div key={index}>
                <hr />
                <CartItem item={item} index={index} />
              </div>
            ))}
          <hr />
          {checkout ? (
            <PlaceOrder />
          ) : (
            <div className={`${style.buy}`}>
              <div>
                <h2>Subtotal {cartTotal} kr</h2>
              </div>
              <button onClick={handleCheckout}>Checkout</button>
            </div>
          )}
        </div>
      ) : (
        <NoItems />
      )}
    </div>
  );
};

export default Checkout;
