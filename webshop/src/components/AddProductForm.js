import ImageDropzone from "../components/ImageDropzone";
import style from "../css/AddProductForm.module.css";
import useAddProduct from "../hooks/useAddProduct";
import { useDropzone } from "react-dropzone";
import { useRef, useState, useEffect, useCallback } from "react";

const AddProductForm = () => {
  const productNameRef = useRef();
  const descRef = useRef();
  const priceRef = useRef();
  const productTypeRef = useRef();
  const [myImages, setMyImages] = useState([]);

  const addProduct = useAddProduct();

  const onDrop = useCallback(
    (acceptedFiles) => {
      setMyImages([...myImages, ...acceptedFiles]);
    },
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
    }
    setMyImages([]);
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
      {addProduct.isSuccess && "Product added!"}
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
          acceptedFiles={myImages}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          fileRejections={fileRejections}
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
