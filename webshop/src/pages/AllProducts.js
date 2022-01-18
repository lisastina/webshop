import ShopProductCard from "../components/ShopProductCard";
import style from "../css/AllProducts.module.css";
import useGetPaginatedCol from "../hooks/useGetPaginatedCol";
import Pagination from "../components/Pagination";
import { useUrlSearchParams } from "use-url-search-params";

const AllProducts = () => {
  const { data, isLoading, fetchNextPage } = useGetPaginatedCol("products");
  const [searchParams, setSearchParams] = useUrlSearchParams(
    { page: 1 },
    { page: Number }
  );

  return (
    <div className={`${style.allProducts} pages-container`}>
      <div className={style.heading}>
        <h1>All products</h1>
      </div>
      <div className={style.products}>
        {data && data.pageParams}
        <button
          onClick={() =>
            setSearchParams(
              (currentParams) => Math.max(currentParams.page - 1),
              1
            )
          }
        >
          hej
        </button>
        {isLoading && <p>loading</p>}
        {data?.pages &&
          data.pages[0].map((product, index) => (
            <ShopProductCard product={product} key={index} index={index} />
          ))}
      </div>
      <Pagination />
    </div>
  );
};

export default AllProducts;
