import ShopProductCard from "../components/ShopProductCard";
import style from "../css/AllProducts.module.css";
import useGetPaginatedCol from "../hooks/useGetPaginatedCol";
import Pagination from "../components/Pagination";
// import { useUrlSearchParams } from "use-url-search-params";

const AllProducts = () => {
  const col = useGetPaginatedCol("products", 1);
  /*  const [searchParams, setSearchParams] = useUrlSearchParams(
    { page: 1 },
    { page: Number }
  ); */

  console.log(col.hasNextPage);
  return (
    <div className={`${style.allProducts} pages-container`}>
      <div className={style.heading}></div>
      <div className={style.products}>
        {col?.data && col?.data.pageParams}
        {/*  <button
          onClick={() =>
            setSearchParams(
              (currentParams) => Math.max(currentParams.page - 1),
              1
            )
          }
        >
          hej
        </button> */}
        {col.isLoading && <p>loading</p>}
        {col?.data?.pages &&
          col?.data.pages[0].map((product, index) => (
            <ShopProductCard product={product} key={index} index={index} />
          ))}
      </div>
      <button onClick={() => col.fetchNextPage()}>hej</button>
      <Pagination col={col} />
    </div>
  );
};

export default AllProducts;
