import style from "../css/AdminPage.module.css";
import { useAuthContext } from "../contexts/AuthContext";

const AdminPage = () => {
  const { logout } = useAuthContext();
  return (
    <div className={`${style.adminPage} pages-container`}>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default AdminPage;
