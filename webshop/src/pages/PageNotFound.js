import style from "../css/PageNotFound.module.css";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className={`pages-container ${style.pageNotFound}`}>
      <h1>This page does not exist</h1>
      <p>Sorry, we could not find this page.</p>
      <Link to="/">
        <button>Go to the homepage</button>
      </Link>
    </div>
  );
};

export default PageNotFound;
