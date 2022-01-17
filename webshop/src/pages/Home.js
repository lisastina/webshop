import ProductList from "../components/ProductList";
import style from "../css/Home.module.css";
import { NavLink } from "react-router-dom";
import useGetCol from "../hooks/useGetCol";

const Home = () => {
  const colQuery = useGetCol("frontpage");

  return (
    <>
      {colQuery?.data && (
        <div className={style.home}>
          <img src={colQuery?.data[0].imageUrl} alt="hero image" />
          <div className="pages-container">
            <div className={style.desc}>
              <h2>{colQuery?.data[0].title}</h2>
              <p>{colQuery?.data[0].text}</p>
              <NavLink exact to="/about">
                <button className="btn-sm">Learn more</button>
              </NavLink>
            </div>
            <ProductList
              products={[
                colQuery.data[0].product01,
                colQuery.data[0].product02,
              ]}
              product01={colQuery.data[0].product01}
              product02={colQuery.data[0].product02}
            />
            <div className={style.seeAll}>
              <NavLink exact to="/products">
                View all products
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
