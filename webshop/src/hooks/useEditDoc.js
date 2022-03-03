import { db } from "../firebase";
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
import { collection, doc } from "firebase/firestore";

const useEditDoc = (col, docId) => {
  const colRef = collection(db, col);
  const docRef = doc(colRef, docId);
  const mutation = useFirestoreDocumentMutation(docRef, {
    merge: true,
  });

  const editDoc = (newValues) => {
    return mutation.mutate(newValues);
  };

  return {
    editDoc,
  };
};

export default useEditDoc;
