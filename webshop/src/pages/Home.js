import ProductList from "../components/ProductList";
import style from "../css/Home.module.css";
import { Link } from "react-router-dom";
import useGetCol from "../hooks/useGetCol";

const Home = () => {
  const { data } = useGetCol("frontpage");

  return (
    <>
      {data && (
        <div className={style.home}>
          <img src={data[0].imageUrl} alt="hero" />
          <div className="pages-container">
            <div className={style.desc}>
              <h2>{data[0].title}</h2>
              <p>{data[0].text}</p>
              <Link to="/about">
                <button className=" btn btn-sm">Learn more</button>
              </Link>
            </div>
            <ProductList products={data[0].products} />
            <div className={style.seeAll}>
              <Link to="/products">View all products</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
