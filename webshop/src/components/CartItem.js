import style from "../css/CartItem.module.css";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../contexts/CartContext";
import { Link } from "react-router-dom";

const CartItem = ({ item, index }) => {
  const { removeFromCart, changeQuantity, checkout } = useContext(CartContext);
  const [product, setProduct] = useState(item);

  const handleQuantity = (e) => {
    setProduct({ ...product, quantity: Number(e.target.value) });
    changeQuantity(index, Number(e.target.value));
  };

  const price = (value) => {
    value = value * item.quantity;
    return value;
  };

  useEffect(() => {
    setProduct({ ...item, quantity: item.quantity });
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {item && (
        <div className={`${style.cartItem} ${checkout && style.checkingOut}`}>
          <div className={style.imgContainer}>
            <div
              className={style.x}
              onClick={() => {
                removeFromCart(item);
              }}
            >
              <span></span>
              <span></span>
            </div>
            <div className={style.imgWrapper}>
              <Link to={`/details/${item._id}`}>
                <img src={item.images && item.images[0].url} alt={item.name} />
              </Link>
            </div>
            <div className={style.title}>
              <Link to={`/details/${item._id}`}>
                <h2>
                  {item.name} {item.productType}
                </h2>
              </Link>
              {item.size && <p>{item.size} cm</p>}
            </div>
          </div>
          <div className={style.info}>
            <div className={style.quantity}>
              <label htmlFor="">QTY:</label>
              {checkout ? (
                <div>
                  <span>{item.quantity}</span>
                </div>
              ) : (
                <input
                  onChange={handleQuantity}
                  value={product.quantity}
                  type="number"
                  min="1"
                  step="1"
                  id={item.name}
                />
              )}
            </div>
            <div>
              <h2>{price(item.price)} kr</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartItem;
