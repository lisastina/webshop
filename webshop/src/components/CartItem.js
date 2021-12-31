import style from "../css/CartItem.module.css";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../contexts/CartContext";

const CartItem = (props) => {
  const { removeFromCart, changeQuantity, checkout } = useContext(CartContext);
  const [product, setProduct] = useState(props.item);

  const handleQuantity = (e) => {
    setProduct({ ...product, quantity: Number(e.target.value) });
    changeQuantity(props.index, Number(e.target.value));
  };

  const price = (value) => {
    value = value * props.item.quantity;
    return value;
  };

  useEffect(() => {
    setProduct({ ...product, quantity: props.item.quantity });
    //eslint-disable-next-line
  }, [props]);

  return (
    <div className={`${style.cartItem} ${checkout && style.checkingOut}`}>
      <div className={style.imgContainer}>
        <div
          className={style.x}
          onClick={() => {
            removeFromCart(props.item);
          }}
        >
          <span></span>
          <span></span>
        </div>
        <div className={style.imgWrapper}>
          <img src={props.item.image01} alt={props.item.name} />
        </div>
        <div className={style.title}>
          <h2>
            {props.item.name} {props.item.productType}
          </h2>
          {props.item.size && <p>{props.item.size} cm</p>}
        </div>
      </div>
      <div className={style.info}>
        <div className={style.quantity}>
          <label htmlFor="">QTY:</label>
          {checkout ? (
            <div>
              <span>{props.item.quantity}</span>
            </div>
          ) : (
            <input
              onChange={handleQuantity}
              value={product.quantity}
              type="number"
              min="1"
              step="1"
              id={props.item.name}
            />
          )}
        </div>
        <div>
          <h2>{price(props.item.price)} kr</h2>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
