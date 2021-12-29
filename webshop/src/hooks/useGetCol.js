import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "../firebase";

const useGetCol = (col) => {
  const colRef = collection(db, "frontpage");

  const colQuery = useFirestoreQueryData(
    ["frontpage"],
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
