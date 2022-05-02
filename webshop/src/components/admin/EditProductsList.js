import style from "../../css/EditProductsList.module.css";
import useGetCol from "../../hooks/useGetCol";
import EditProductCard from "./EditProductCard";

const EditProductsList = () => {
  const products = useGetCol("products");

  return (
    <>
      <div className={style.editProductsList}>
        <h2>Edit products</h2>
        {products.data &&
          products.data.map((product, index) => (
            <div key={index}>
              <hr />
              <EditProductCard product={product} />
            </div>
          ))}
        <hr />
      </div>
    </>
  );
};

export default EditProductsList;
