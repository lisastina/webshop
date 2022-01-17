import style from "../css/ShopProductCard.module.css";
import { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { useHistory } from "react-router-dom";

const ShopProductCard = ({ product }) => {
  const history = useHistory();
  const { viewProduct } = useContext(ProductContext);

  return (
    <div
      className={style.shopProductCard}
      onClick={() => viewProduct(product._id, history)}
    >
      <div className={style.imgWrapper}>
        <img
          src={product.images[0].url}
          alt={`${product.name} ${product.productType}`}
        />
      </div>
      <div className={style.desc}>
        <h2>
          {product.name} {product.productType}
        </h2>
        <h2 className={style.price}>{product.price} kr</h2>
      </div>
    </div>
  );
};

export default ShopProductCard;
