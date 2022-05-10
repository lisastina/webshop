import style from "../css/AdminPage.module.css";
import { useAuthContext } from "../contexts/AuthContext";
import Login from "../components/admin/Login";
import { useState } from "react";
import AddProductForm from "../components/admin/AddProductForm";
import EditProductsList from "../components/admin/EditProductsList";
import EditContent from "../components/admin/EditContent";
import useLocalStorage from "../hooks/useLocalStorage";

const AdminPage = () => {
  const { logout, currentUser } = useAuthContext();
  const [isloggingIn, setIsLoggingIn] = useState(false);
  const [activeLink, setActiveLink] = useLocalStorage(
    "activeLinkAdmin",
    "editProducts"
  );
  // eslint-disable-next-line
  const [activeLinkEditContent, setActiveLinkEditContent] = useLocalStorage(
    "activeLinkEditContent",
    "frontpage"
  );

  return (
    <>
      {currentUser && !isloggingIn ? (
        <div className={`${style.adminPage} pages-container`}>
          <div className={style.options}>
            <button
              onClick={() => {
                setActiveLink("editProducts");
                setActiveLinkEditContent("frontpage");
              }}
              className={
                activeLink === "editProducts"
                  ? `${style.active} ${style.link}`
                  : style.link
              }
            >
              Edit products
            </button>
            <button
              onClick={() => {
                setActiveLink("editContent");
                setActiveLinkEditContent("frontpage");
              }}
              className={
                activeLink === "editContent"
                  ? `${style.active} ${style.link}`
                  : style.link
              }
            >
              Edit content
            </button>
            <button
              onClick={() => {
                setActiveLink("addProduct");
                setActiveLinkEditContent("frontpage");
              }}
              className={
                activeLink === "addProduct"
                  ? `${style.active} ${style.link}`
                  : style.link
              }
            >
              Add product
            </button>
            <button onClick={() => logout()} className={`btn ${style.btn}`}>
              Logout
            </button>
          </div>
          {activeLink === "editProducts" && <EditProductsList />}
          {activeLink === "editContent" && <EditContent />}
          {activeLink === "addProduct" && <AddProductForm />}
        </div>
      ) : (
        <Login setIsLoggingIn={setIsLoggingIn} />
      )}
    </>
  );
};

export default AdminPage;
