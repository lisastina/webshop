import style from "../css/NoItems.module.css";
import { Link } from "react-router-dom";

const NoItems = () => {
  return (
    <div className={style.noItems}>
      <img src="/assets/icons/empty-cart-icon.png" alt="Empty shopping bag" />
      <h1>Your shopping bag is empty...</h1>
      <p>Take a look at some of my products!</p>
      <Link to="/shop">
        <button className="btn">Start shopping</button>
      </Link>
    </div>
  );
};

export default NoItems;
<div className={style.noItems}></div>;
