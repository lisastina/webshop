import { useFirestoreInfiniteQueryData } from "@react-query-firebase/firestore";
import { collection, query, limit, startAfter } from "firebase/firestore";
import { db } from "../firebase";

const useGetCol = (col) => {
  const colRef = collection(db, col);

  const productsQuery = query(colRef, limit(4));

  const colQuery = useFirestoreInfiniteQueryData(
    [col],
    productsQuery,
    (snapshot) => {
      /* const lastVisible = snapshot.docs[snapshot.docs.length - 1];

      return query(colRef, startAfter(lastVisible), limit(2)); */
      /*    const lastDocument = snapshot.docs[snapshot.docs.length - 1];

      // Get the next 20 documents starting after the last document fetched.
      return query(productsQuery, startAfter(lastDocument)); */
    }
  );

  return colQuery;
};

export default useGetCol;
