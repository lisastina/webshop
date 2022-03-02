import { useState, useRef } from "react";
import style from "../css/EditProductsList.module.css";
import useEditDoc from "../hooks/useEditDoc";
import DeleteConfirmation from "./DeleteConfirmation";
import useDeleteDoc from "../hooks/useDeleteDoc";

const EditProductCard = ({ product }) => {
  const [dropdown, setDropdown] = useState(false);
  const productNameRef = useRef();
  const descRef = useRef();
  const priceRef = useRef();
  const productTypeRef = useRef();
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const deleteProduct = useDeleteDoc("products", product);
  const editProduct = useEditDoc("products", product._id);

  const handleSubmit = (e) => {
    e.preventDefault();

    editProduct.editDoc({
      name: productNameRef.current.value,
      desc: descRef.current.value,
      price: priceRef.current.value,
      type: productTypeRef.current.value,
    });
  };

  return (
    <>
      {deleteConfirm && (
        <DeleteConfirmation
          setDropdown={setDropdown}
          product={product}
          setDeleteConfirm={setDeleteConfirm}
        />
      )}
      <div className={style.editProduct}>
        <div onClick={() => setDropdown(!dropdown)} className={style.header}>
          <h3>
            {product.name} {product.type}
          </h3>
          <div className={`${style.arrow} ${dropdown && style.up}`}></div>
        </div>
        {dropdown && (
          <form onSubmit={handleSubmit} className={style.dropdownForm}>
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
                />
                <label htmlFor="desc">Description</label>
                <textarea
                  id="desc"
                  rows="3"
                  required
                  ref={descRef}
                  maxLength="150"
                  defaultValue={product.desc}
                />

                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  required
                  ref={priceRef}
                  defaultValue={product.price}
                />

                <label htmlFor="product-type">Product type</label>
                <input
                  type="text"
                  id="product-type"
                  required
                  ref={productTypeRef}
                  defaultValue={product.type}
                />
              </div>
            </div>
            <div className={style.buttons}>
              <button
                className={`btn btn-sm ${style.deleteBtn}`}
                onClick={() => setDeleteConfirm(true)}
                disabled={
                  /* acceptedFiles.length <= 0 ||  */ deleteProduct.isDeleting
                }
              >
                Delete product
              </button>
              <button
                className="btn btn-sm"
                type="submit"
                disabled={
                  /* acceptedFiles.length <= 0 ||  */ deleteProduct.isDeleting
                }
              >
                Save changes
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default EditProductCard;
