import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "../firebase";

const useGetCol = (col) => {
  const colRef = collection(db, col);

  const colQuery = useFirestoreQueryData(
    [col],
    colRef,
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
