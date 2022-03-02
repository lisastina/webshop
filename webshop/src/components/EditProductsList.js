import style from "../css/EditProductsList.module.css";
import useGetCol from "../hooks/useGetCol";

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
              <div className={style.editProduct}>
                <h3>
                  {product.name} {product.type}
                </h3>
              </div>
            </div>
          ))}
        <hr />
      </div>
    </>
  );
};

export default EditProductsList;
