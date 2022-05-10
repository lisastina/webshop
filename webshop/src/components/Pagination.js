import style from "../css/Pagination.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Pagination = ({ col }) => {
  return (
    <div className={style.pagination}>
      <button
        className="btn-sm"
        disabled={col.isFetchingPreviousPage || !col.hasPreviousPage}
        onClick={() => col.fetchPreviousPage()}
      >
        prev
        {/* <FontAwesomeIcon icon={faArrowLeft} /> */}
      </button>
      <h2>1</h2>
      <button
        className="btn-sm"
        disabled={col.isFetchingNextPage || !col.hasNextPage}
        onClick={() => col.fetchNextPage()}
      >
        next
        {/* <FontAwesomeIcon icon={faArrowRight} /> */}
      </button>
    </div>
  );
};

export default Pagination;
