import style from "../css/AdminPage.module.css";
import { useAuthContext } from "../contexts/AuthContext";
import Login from "./Login";
import { useState } from "react";
import AddProductForm from "../components/AddProductForm";

const AdminPage = () => {
  const { logout, currentUser } = useAuthContext();

  return (
    <>
      {currentUser ? (
        <div className={`${style.adminPage} pages-container`}>
          <div className={style.options}>
            <p>Add new product</p>
            <p>Edit products</p>
            <p>Edit content</p>
            <button onClick={() => logout()}>Logout</button>
          </div>
          <div>
            <AddProductForm />
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default AdminPage;
