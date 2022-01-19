import style from "../css/AdminPage.module.css";
import { useAuthContext } from "../contexts/AuthContext";
import Login from "./Login";

const AdminPage = () => {
  const { logout, currentUser } = useAuthContext();
  return (
    <>
      {currentUser ? (
        <div className={`${style.adminPage} pages-container`}>
          <button onClick={() => logout()}>Logout</button>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default AdminPage;
