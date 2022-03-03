import ImageDropzone from "../components/ImageDropzone";
import style from "../css/AddProductForm.module.css";
import useAddProduct from "../hooks/useAddProduct";
import { useDropzone } from "react-dropzone";
import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const AddProductForm = () => {
  const productNameRef = useRef();
  const descRef = useRef();
  const priceRef = useRef();
  const productTypeRef = useRef();
  const navigate = useNavigate();

  const addProduct = useAddProduct();
  const productUuid = uuidv4();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!acceptedFiles.length) {
      return;
    }

    await addProduct.addProduct(productUuid, acceptedFiles, {
      name: productNameRef.current.value,
      desc: descRef.current.value,
      price: priceRef.current.value,
      type: productTypeRef.current.value,
    });
  };

  /* 
  useEffect(() => {
    if (addProduct.isSuccess) {
      navigate(`/products/${productUuid}`);
    }
  }, [addProduct.isSuccess]);
 */

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isDragActive,
    isDragAccept,
    isDragReject,
    fileRejections,
  } = useDropzone({
    maxFiles: 3,
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
            fileRejections,
          }}
        />
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
