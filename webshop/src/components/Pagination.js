import style from "../css/Pagination.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Pagination = ({ params }) => {
  return (
    <div className={style.pagination}>
      <button
        className="btn-sm"
        // disabled={params.isFetchingPreviousPage || !params.hasPreviousPage}
        // onClick={() => params.fetchPreviousPage()}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <h2>1</h2>
      <button
        className="btn-sm"
        // disabled={params.isFetchingNextPage || !params.hasNextPage}
        // onClick={() => params.fetchNextPage()}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

export default Pagination;
