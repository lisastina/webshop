import ProductCard from "./ProductCard";
const ProductList = ({ products }) => {
  return (
    <div>
      {products?.map((product, index) => {
        return <ProductCard productId={product} index={index} key={index} />;
      })}
    </div>
  );
};

export default ProductList;
