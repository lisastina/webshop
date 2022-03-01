import ImageDropzone from "../components/ImageDropzone";
import style from "../css/AddProductForm.module.css";
import useAddProduct from "../hooks/useAddProduct";
import { useDropzone } from "react-dropzone";
import { useRef, useState, useEffect } from "react";

const AddProductForm = () => {
  // const [images, setImages] = useState(null);
  const productNameRef = useRef();
  const descRef = useRef();
  const priceRef = useRef();
  const productTypeRef = useRef();

  const addProduct = useAddProduct();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!acceptedFiles.length) {
      return;
    }

    addProduct.addProduct(acceptedFiles, {
      name: productNameRef.current.value,
      desc: descRef.current.value,
      price: priceRef.current.value,
      type: productTypeRef.current.value,
    });
  };

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/gif, image/jpeg, image/png, image/webp",
    handleSubmit,
  });

  return (
    <form className={style.addProductForm} onSubmit={handleSubmit}>
      <h2>Add new product</h2>
      <div className={style.formContent}>
        <div className={style.inputs}>
          <label htmlFor="product-name">Product name</label>
          <input
            type="text"
            maxLength="15"
            id="product-name"
            required
            ref={productNameRef}
          />
          <label htmlFor="desc">Description</label>
          <textarea id="desc" rows="3" required ref={descRef} maxLength="150" />

          <label htmlFor="price">Price</label>
          <input type="number" id="price" required ref={priceRef} />

          <label htmlFor="product-type">Product type</label>
          <input type="text" id="product-type" required ref={productTypeRef} />
        </div>

        <ImageDropzone
          required
          params={{
            acceptedFiles,
            getRootProps,
            getInputProps,
            isDragActive,
            isDragAccept,
          }}
        />
      </div>
      <button type="submit">add product</button>
    </form>
  );
};

export default AddProductForm;
