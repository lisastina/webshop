import { useState, useRef, useEffect, useCallback } from "react";
import style from "../../css/EditProductsList.module.css";
import useEditDoc from "../../hooks/useEditDoc";
import DeleteConfirmation from "./DeleteConfirmation";
import useDeleteDoc from "../../hooks/useDeleteDoc";
import useDeleteImage from "../../hooks/useDeleteImage";
import ImageDropzone from "../ImageDropzone";
import { useDropzone } from "react-dropzone";

const EditProductCard = ({ product }) => {
  const [dropdown, setDropdown] = useState(false);
  const productNameRef = useRef();
  const descRef = useRef();
  const priceRef = useRef();
  const productTypeRef = useRef();
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const deleteImage = useDeleteImage("products", product._id);
  const deleteProduct = useDeleteDoc("products", product);
  const editProduct = useEditDoc("products", product._id);
  const [myImages, setMyImages] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setMyImages([...acceptedFiles]);
    },
    // eslint-disable-next-line
    [myImages]
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (acceptedFiles.length > 0) {
      editProduct.uploadImages(acceptedFiles, product);
    }

    editProduct.editDoc({
      name: productNameRef.current.value,
      desc: descRef.current.value,
      price: priceRef.current.value,
      type: productTypeRef.current.value,
    });
  };

  const handleDeleteImg = (i) => {
    if (product.images[i]) {
      let imagesCopy = product.images;
      let imagePath = product.images[i].path;

      imagesCopy.splice(i, 1);
      deleteImage.deleteImage(imagePath, { images: imagesCopy });
    }
  };

  useEffect(() => {
    if (editProduct.isSuccess) setMyImages([]);
  }, [editProduct.isSuccess]);

  const { getRootProps, getInputProps, acceptedFiles, fileRejections } =
    useDropzone({
      maxFiles: 3,
      accept: "image/gif, image/jpeg, image/png",
      onDrop,
      handleSubmit,
    });

  return (
    <>
      {deleteConfirm && (
        <DeleteConfirmation
          setDropdown={setDropdown}
          product={product}
          setDeleteConfirm={setDeleteConfirm}
          deleteProduct={deleteProduct}
        />
      )}
      <div className={style.editProduct}>
        <div
          onClick={() => {
            setDropdown(!dropdown);
            editProduct.setIsSuccess(false);
          }}
          className={style.header}
        >
          <h3>
            {product.name} {product.type}
          </h3>
          <div className={`${style.arrow} ${dropdown && style.up}`}></div>
        </div>

        {dropdown && (
          <form onSubmit={handleSubmit} className={style.dropdownForm}>
            {editProduct.isSuccess && !editProduct.isAdding && (
              <div className={style.saveAlert}>
                <p>Your changes has been saved!</p>
              </div>
            )}
            <div className={style.formContent}>
              <div className={style.inputs}>
                <label htmlFor="product-name">Name</label>
                <input
                  type="text"
                  maxLength="15"
                  id="product-name"
                  required
                  ref={productNameRef}
                  defaultValue={product.name}
                  onClick={() => editProduct.setIsSuccess(false)}
                />
                <label htmlFor="desc">Description</label>
                <textarea
                  id="desc"
                  rows="5"
                  required
                  ref={descRef}
                  maxLength="250"
                  defaultValue={product.desc}
                  onClick={() => editProduct.setIsSuccess(false)}
                />

                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  required
                  ref={priceRef}
                  defaultValue={product.price}
                  onClick={() => editProduct.setIsSuccess(false)}
                />

                <label htmlFor="product-type">Product type</label>
                <input
                  type="text"
                  id="product-type"
                  required
                  ref={productTypeRef}
                  defaultValue={product.type}
                  onClick={() => editProduct.setIsSuccess(false)}
                />
              </div>
              <div className={style.editImages}>
                <div className={style.images}>
                  {product.images &&
                    product.images.map((image, i) => {
                      return (
                        <div className={style.imageWrapper} key={i}>
                          <div
                            className={style.deleteImg}
                            onClick={() => {
                              handleDeleteImg(i);
                              editProduct.setIsSuccess(false);
                            }}
                          >
                            <span></span>
                            <span></span>
                          </div>
                          <img src={image.url} alt={image.name} />
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
            <div className={style.buttons}>
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={() => setDeleteConfirm(true)}
              >
                Delete product
              </button>
              <button
                className="btn btn-sm"
                type="submit"
                disabled={editProduct.isAdding}
              >
                {editProduct.isAdding ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default EditProductCard;
