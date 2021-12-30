import style from "../css/ProductCard.module.css";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";
import useGetDoc from "../hooks/useGetDoc";

const ProductCard = ({ productId, index }) => {
  const history = useHistory();
  const { viewProduct } = useContext(ProductContext);

  const product = useGetDoc("products", "frontpageProduct01", productId);

  const isOdd = (num) => {
    return num % 2;
  };

  return (
    <>
      {product.data && (
        <div
          className={`${style.productCard} ${isOdd(index) && style.reverse}`}
        >
          <div className={style.imgWrapper}>
            <img
              onClick={() => viewProduct(product.data, history)}
              src={product.data.image01}
              alt={`${product.data.name} ${product.data.productType}`}
            />
          </div>
          <div className={style.desc}>
            <h2>
              {product.data.name} {product.data.productType}
            </h2>
            <p>{product.data.desc}</p>
            <button onClick={() => viewProduct(product.data, history)}>
              Purchase item
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
