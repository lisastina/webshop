import style from "../../css/EditContent.module.css";
import { useRef, useState, useCallback, useEffect } from "react";
import useEditDoc from "../../hooks/useEditDoc";
import useGetCol from "../../hooks/useGetCol";
import ImageDropzone from "../ImageDropzone";
import { useDropzone } from "react-dropzone";
import useChangeHero from "../../hooks/useChangeHero";

const EditFrontpage = ({ data }) => {
  const products = useGetCol("products");
  const heroRef = useRef();
  const productRef1 = useRef();
  const productRef2 = useRef();
  const productRef3 = useRef();
  const textRef = useRef();
  const titleRef = useRef();
  const editFrontpage = useEditDoc("frontpage", data._id);
  const uploadHero = useChangeHero(data);
  const [myImages, setMyImages] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setMyImages([...acceptedFiles]);
    },
    [myImages]
  );

  useEffect(() => {
    if (uploadHero.isSuccess) setMyImages([]);
  }, [uploadHero.isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (acceptedFiles.length > 0) {
      uploadHero.uploadImage(acceptedFiles);
    }

    editFrontpage.editDoc({
      text: textRef.current.value,
      title: titleRef.current.value,
      products: [
        productRef1.current.value,
        productRef2.current.value,
        productRef3.current.value,
      ],
    });
  };

  const { getRootProps, getInputProps, acceptedFiles, fileRejections } =
    useDropzone({
      maxFiles: 1,
      accept: "image/gif, image/jpeg, image/png",
      onDrop,
      handleSubmit,
    });

  return (
    <>
      {data && (
        <form onSubmit={handleSubmit}>
          {editFrontpage.isSuccess && !uploadHero.isAdding && (
            <div className={style.saveAlert}>
              <p>Your changes has been saved!</p>
            </div>
          )}
          <label htmlFor="heroImage">Hero image</label>
          <div className={style.heroImage}>
            <div className={style.imageDropzone}>
              <ImageDropzone
                className={style.drop}
                acceptedFiles={myImages}
                getRootProps={getRootProps}
                getInputProps={getInputProps}
                fileRejections={fileRejections}
              >
                <p>Do not select more than 1 image</p>
                <div className={style.imageWrapper}>
                  <p>
                    Drop a new image here or click to browse. Dimensions 600 x
                    250
                  </p>
                  <img src={data.heroImage.url} alt={data.heroImage.name} />
                </div>
              </ImageDropzone>
            </div>
          </div>
          <div className={style.inputs}>
            <label htmlFor="github">Title</label>
            <input
              id="github"
              type="text"
              defaultValue={data.title}
              ref={titleRef}
              required
              onClick={() => editFrontpage.setIsSuccess(false)}
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
              onClick={() => editFrontpage.setIsSuccess(false)}
            />
            <label htmlFor="products">Promoted products</label>
            <div className={style.selectList}>
              {/* {data?.products.map((productId, i) => {
                console.log(productId);
                return (
                  <div
                    className={`customSelect ${style.select}`}
                    key={i}
                    onClick={() => editFrontpage.setIsSuccess(false)}
                  >
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
              })} */}
              <div className={`customSelect ${style.select}`}>
                <select name="product-1" id="product-1" ref={productRef1}>
                  {products?.data &&
                    products.data.map((product) => {
                      if (product._id === data.products[0]) {
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
              <div className={`customSelect ${style.select}`}>
                <select name="product-2" id="product-2" ref={productRef2}>
                  {products?.data &&
                    products.data.map((product) => {
                      if (product._id === data.products[1]) {
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
              <div className={`customSelect ${style.select}`}>
                <select name="product-3" id="product-3" ref={productRef3}>
                  {products?.data &&
                    products.data.map((product) => {
                      if (product._id === data.products[2]) {
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
            </div>
          </div>
          <button
            className={`btn ${style.saveBtn}`}
            type="submit"
            disabled={uploadHero.isAdding}
          >
            {uploadHero.isAdding ? "Saving..." : "Save changes"}
          </button>
        </form>
      )}
    </>
  );
};

export default EditFrontpage;
