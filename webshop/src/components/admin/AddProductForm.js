import ImageDropzone from "../ImageDropzone";
import style from "../../css/AddProductForm.module.css";
import useAddProduct from "../../hooks/useAddProduct";
import { useDropzone } from "react-dropzone";
import { useRef, useState, useEffect, useCallback } from "react";

const AddProductForm = () => {
  const productNameRef = useRef();
  const descRef = useRef();
  const priceRef = useRef();
  const productTypeRef = useRef();
  const [myImages, setMyImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [alert, setAlert] = useState(false);

  const addProduct = useAddProduct();

  const onDrop = useCallback(
    (acceptedFiles) => {
      setMyImages([...acceptedFiles]);

      setPreview(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    // eslint-disable-next-line
    [myImages]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!acceptedFiles.length) {
      return;
    }

    await addProduct.addProduct(acceptedFiles, {
      name: productNameRef.current.value,
      desc: descRef.current.value,
      price: priceRef.current.value,
      type: productTypeRef.current.value,
    });
  };

  useEffect(() => {
    if (addProduct.isSuccess) {
      productNameRef.current.value = "";
      descRef.current.value = "";
      priceRef.current.value = "";
      productTypeRef.current.value = "";
      setAlert(true);
      setMyImages([]);
      setPreview([]);
    }
  }, [addProduct.isSuccess]);

  const { getRootProps, getInputProps, acceptedFiles, fileRejections } =
    useDropzone({
      maxFiles: 3,
      accept: "image/gif, image/jpeg, image/png",
      onDrop,
      handleSubmit,
    });

  return (
    <form className={style.addProductForm} onSubmit={handleSubmit}>
      <h2>Add new product</h2>
      {alert && (
        <div className={style.addedAlert}>
          <p>The product was successfully added!</p>
        </div>
      )}
      <div className={style.formContent}>
        <div className={style.inputs}>
          <label htmlFor="product-name">Product name</label>
          <input
            type="text"
            maxLength="15"
            id="product-name"
            required
            ref={productNameRef}
            onClick={() => setAlert(false)}
          />
          <label htmlFor="desc">Description</label>
          <textarea
            id="desc"
            rows="5"
            required
            ref={descRef}
            maxLength="250"
            onClick={() => setAlert(false)}
          />

          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            required
            ref={priceRef}
            onClick={() => setAlert(false)}
          />

          <label htmlFor="product-type">Product type</label>
          <input
            type="text"
            id="product-type"
            required
            ref={productTypeRef}
            onClick={() => setAlert(false)}
          />
        </div>

        <div className={style.imagesAndDrop}>
          <div className={style.images}>
            {preview &&
              preview.map((image, i) => {
                return (
                  <div className={style.imageWrapper} key={i}>
                    <img src={image.preview} alt={image.name} />
                  </div>
                );
              })}
          </div>

          <ImageDropzone
            acceptedFiles={myImages}
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            fileRejections={fileRejections}
          >
            <p>Do not select more than 3 files</p>
            <p>
              Drop your images here or click to browse. <br />
              Up to 3 images accepted.
            </p>
          </ImageDropzone>
        </div>
      </div>
      <button
        className="btn"
        type="submit"
        disabled={acceptedFiles.length <= 0 || addProduct.isAdding}
      >
        {addProduct.isAdding ? "Adding..." : "Add product"}
      </button>
    </form>
  );
};

export default AddProductForm;
