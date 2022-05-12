import ShopProductCard from "../components/ShopProductCard";
import style from "../css/AllProducts.module.css";
import useGetCol from "../hooks/useGetCol";

const AllProducts = () => {
  const products = useGetCol("products");

  return (
    <div className={`${style.allProducts} pages-container`}>
      <div className={style.heading}></div>
      <div className={style.products}>
        {products.data &&
          products.data.map((product, index) => (
            <ShopProductCard product={product} key={index} index={index} />
          ))}
      </div>
    </div>
  );
};

export default AllProducts;
