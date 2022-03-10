import style from "../css/EditContent.module.css";
import { useRef } from "react";
import useEditDoc from "../hooks/useEditDoc";
import useGetCol from "../hooks/useGetCol";

const EditFrontpage = ({ data }) => {
  const products = useGetCol("products");
  const heroRef = useRef();
  const productRef1 = useRef();
  const productRef2 = useRef();
  const productRef3 = useRef();
  const textRef = useRef();
  const titleRef = useRef();
  const editFrontpage = useEditDoc("frontpage", data._id);

  const handleSubmit = (e) => {
    e.preventDefault();

    editFrontpage.editDoc({
      text: textRef.current.value,
      title: titleRef.current.value,
    });
  };

  return (
    <>
      {data && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="heroImage">Hero image</label>
          <div className={style.imageWrapper}>
            <img src={data.heroImage.url} alt={data.heroImage.name} />
          </div>
          <div className={style.inputs}>
            <label htmlFor="github">Title</label>
            <input
              id="github"
              type="text"
              defaultValue={data.title}
              ref={titleRef}
              required
            />
            <label htmlFor="text">Text</label>
            <textarea
              id="text"
              rows="6"
              required
              ref={textRef}
              maxLength="400"
              defaultValue={data.text}
              required
            />
            <label htmlFor="products">Promoted products</label>
            <div className={style.selectList}>
              {data?.products.map((productId, i) => {
                console.log(productId);
                return (
                  <div className={`customSelect ${style.select}`} key={i}>
                    <select
                      name="product-1"
                      id="product-1"
                      // defaultValue={productId}
                    >
                      {products?.data &&
                        products.data.map((product) => {
                          if (product._id === productId) {
                            return (
                              <option
                                selected
                                value={product._id}
                                key={product._id}
                              >
                                {product.name} {product.type}
                              </option>
                            );
                          }
                          return (
                            <option value={product._id} key={product._id}>
                              {product.name} {product.type}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                );
              })}
              {/* <div className={`customSelect ${style.select}`}>
                <select name="product-2" id="product-2">
                  <option value="tBUAlfaswXhJ1KDBehP4">
                    Wildflowers poster
                  </option>
                </select>
              </div>
              <div className={`customSelect ${style.select}`}>
                <select name="product-3" id="product-3">
                  <option value="tBUAlfaswXhJ1KDBehP4">
                    Wildflowers poster
                  </option>
                </select>
              </div> */}
            </div>
          </div>
          <button className={`btn ${style.saveBtn}`} type="submit">
            Save changes
          </button>
        </form>
      )}
    </>
  );
};

export default EditFrontpage;
