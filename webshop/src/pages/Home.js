import ProductList from "../components/ProductList";
import style from "../css/Home.module.css";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className={style.home}>
      <img src="/assets/imgs/header.jpg" alt="header" />
      <div className="pages-container">
        <div className={style.desc}>
          <h2>The freedom in nature and artwork.</h2>
          <p>
            I can't deny my love for nature and wildlife. And to be able to
            capture that feeling through art is a passion for me. The sense of
            freedom from jumping between cliffs, feeling the warmth beneath your
            soles and smelling the salt in the breeeze. It smells sweet, like
            home and possibilities. And expressing myself through art feels like
            the path leading me there.
          </p>
          <NavLink exact to="/about">
            <button className="btn-sm">Learn more</button>
          </NavLink>
        </div>
        <ProductList />
        <div className={style.seeAll}>
          <NavLink exact to="/products">
            View all products
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Home;
