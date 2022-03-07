import style from "../css/ProductCard.module.css";
import { Link } from "react-router-dom";
import useGetDoc from "../hooks/useGetDoc";

const ProductCard = ({ productId, index }) => {
  const { data: product } = useGetDoc(
    "products",
    "frontpageProduct01",
    productId
  );

  const isOdd = (num) => {
    return num % 2;
  };

  return (
    <>
      {product && (
        <div
          className={`${style.productCard} ${isOdd(index) && style.reverse}`}
        >
          <div className={style.imgWrapper}>
            <Link to={`/products/${productId}`}>
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
            <p>{product.desc}</p>
            <Link to={`/products/${productId}`}>
              <button className="btn">Purchase item</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
