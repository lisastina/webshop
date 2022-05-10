import { useFirestoreInfiniteQueryData } from "@react-query-firebase/firestore";
import {
  collection,
  query,
  limit,
  startAfter,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

const useGetCol = (col) => {
  const colRef = collection(db, col);

  const productsQuery = query(colRef, orderBy("created", "desc"), limit(12));

  const colQuery = useFirestoreInfiniteQueryData(
    [col],
    productsQuery,
    (snapshot) => {
      const lastVisible = snapshot[snapshot.length - 1];

      return query(productsQuery, startAfter(lastVisible));

      // return query(productsQuery, startAfter(lastVisible));
    },
    { idField: "_id" }
  );
  console.log(colQuery);
  return colQuery;
};

export default useGetCol;
