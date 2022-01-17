import style from "../css/ShopProductCard.module.css";
import { Link } from "react-router-dom";

const ShopProductCard = ({ product }) => {
  return (
    <Link to={`/details/${product._id}`}>
      <div className={style.shopProductCard}>
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
    </Link>
  );
};

export default ShopProductCard;
