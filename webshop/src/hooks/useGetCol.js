import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

const useGetCol = (col) => {
  const colRef = collection(db, col);

  const q = query(colRef, orderBy("created", "desc"));

  const colQuery = useFirestoreQueryData(
    [col],
    col === "products" ? q : colRef,
    {
      idField: "_id",
      subscribe: true,
    },
    {
      refetchOnMount: "always",
    }
  );

  return colQuery;
};

export default useGetCol;
