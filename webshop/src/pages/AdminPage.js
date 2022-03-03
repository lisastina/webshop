import style from "../css/AdminPage.module.css";
import { useAuthContext } from "../contexts/AuthContext";
import Login from "../components/Login";
import { useState } from "react";
import AddProductForm from "../components/AddProductForm";
import EditProductsList from "../components/EditProductsList";

const AdminPage = () => {
  const { logout, currentUser } = useAuthContext();
  const [editProducts, setEditProducts] = useState(true);
  const [editContent, setEditContent] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [isloggingIn, setIsLoggingIn] = useState(false);

  return (
    <>
      {currentUser && !isloggingIn ? (
        <div className={`${style.adminPage} pages-container`}>
          <div className={style.options}>
            <button
              onClick={() => {
                setEditProducts(true);
                setEditContent(false);
                setAddProduct(false);
              }}
              className={
                editProducts ? `${style.active} ${style.link}` : style.link
              }
            >
              Edit products
            </button>
            <button
              onClick={() => {
                setEditProducts(false);
                setEditContent(true);
                setAddProduct(false);
              }}
              className={
                editContent ? `${style.active} ${style.link}` : style.link
              }
            >
              Edit content
            </button>
            <button
              onClick={() => {
                setEditProducts(false);
                setEditContent(false);
                setAddProduct(true);
              }}
              className={
                addProduct ? `${style.active} ${style.link}` : style.link
              }
            >
              Add product
            </button>
            <button onClick={() => logout()} className={`btn ${style.btn}`}>
              Logout
            </button>
          </div>
          {editProducts && <EditProductsList />}
          {editContent && <div>edit content</div>}
          {addProduct && <AddProductForm />}
        </div>
      ) : (
        <Login setIsLoggingIn={setIsLoggingIn} />
      )}
    </>
  );
};

export default AdminPage;
