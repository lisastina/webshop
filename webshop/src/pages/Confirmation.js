import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import style from "../css/Confirmation.module.css";

const Confirmation = () => {
  const history = useHistory();
  const { order } = useContext(CartContext);

  return (
    <div className={style.confirmation}>
      {order ? (
        <div className={style.order}>
          <h1>Thank you for your order!</h1>
          <hr />
          <div className={style.orderInfo}>
            <div className={style.items}>
              <h2>Purchased items</h2>
              {order.cartItems &&
                order.cartItems.map((item, i) => (
                  <p key={i}>
                    {item.quantity} x {item.name} {item.productType}{" "}
                    {item.size && item.size}
                  </p>
                ))}
            </div>
            <div className={style.shippingInfo}>
              <h2>Order information</h2>
              <p>
                {order.shipping.firstName} {order.shipping.lastName}
                <br /> {order.shipping.street} <br />
                {order.shipping.zip} {order.shipping.city} <br />
                {order.shipping.country}
              </p>
              <p>
                {order.shipping.email} <br />
                {order.shipping.phone}
              </p>
              <p>Payment method: {order.shipping.payment}</p>
              <h3>Total price: {order.totalPrice} kr</h3>
            </div>
          </div>
        </div>
      ) : (
        history.push("/")
      )}
    </div>
  );
};

export default Confirmation;
