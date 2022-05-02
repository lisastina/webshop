import style from "../css/ShopProductCard.module.css";
import { Link } from "react-router-dom";

const ShopProductCard = ({ product }) => {
  return (
    <div className={style.shopProductCard}>
      <div className={style.imgWrapper}>
        <Link to={`/shop/${product._id}`}>
          <img
            src={
              product.images?.length
                ? product.images[0].url
                : "../assets/imgs/placeholder.png"
            }
            alt={`${product.name} ${product.type}`}
          />
        </Link>
      </div>
      <div className={style.desc}>
        <h2>
          {product.name} {product.type}
        </h2>
        <h2 className={style.price}>{product.price} kr</h2>
      </div>
    </div>
  );
};

export default ShopProductCard;
