import style from "../../css/DeleteConfirmaion.module.css";

const DeleteConfirmation = ({
  product,
  setDropdown,
  setDeleteConfirm,
  deleteProduct,
}) => {
  const handleDelete = () => {
    setDeleteConfirm(false);
    setDropdown(false);
    deleteProduct.deleteDocument();
  };
  return (
    <div className={style.deleteConfirm}>
      <div className={style.popUp}>
        <h2>
          Delete{" "}
          <span>
            {product.name} {product.type}
          </span>
        </h2>
        <hr />
        <p>Are you sure you want to delete this product?</p>
        <div className={style.buttons}>
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => {
              setDeleteConfirm(false);
            }}
          >
            Cancel
          </button>
          <button className="btn btn-sm" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
