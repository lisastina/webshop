import style from "../css/NoItems.module.css";
import { useHistory } from "react-router-dom";

const NoItems = () => {
  const history = useHistory();

  return (
    <div className={style.noItems}>
      <img src="/assets/icons/empty-cart-icon.png" alt="Empty shopping bag" />
      <h1>Your shopping bag is empty...</h1>
      <p>Take a look at some of my products!</p>
      <button
        onClick={() => {
          history.push("/products");
        }}
      >
        Start shopping
      </button>
    </div>
  );
};

export default NoItems;
<div className={style.noItems}></div>;
