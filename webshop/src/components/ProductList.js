import ProductCard from "./ProductCard";
import { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";

const ProductList = () => {
  const { products } = useContext(ProductContext);

  return (
    <div>
      {products &&
        products
          .slice(0, 2)
          .map((product, index) => (
            <ProductCard product={product} key={index} index={index} />
          ))}
    </div>
  );
};

export default ProductList;
