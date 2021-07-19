import style from "../css/ProductCard.module.css";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";

const ProductCard = (props) => {
  const history = useHistory();
  const { viewProduct } = useContext(ProductContext);

  const isOdd = (num) => {
    return num % 2;
  };

  return (
    <div
      className={`${style.productCard} ${isOdd(props.index) && style.reverse}`}
    >
      <div className={style.imgWrapper}>
        <img
          onClick={() => viewProduct(props.product, history)}
          src={props.product.img}
          alt={`${props.product.name} ${props.product.productType}`}
        />
      </div>
      <div className={style.desc}>
        <h2>
          {props.product.name} {props.product.productType}
        </h2>
        <p>{props.product.desc}</p>
        <button onClick={() => viewProduct(props.product, history)}>
          Purchase item
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
