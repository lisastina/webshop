import { db, storage } from "../firebase";
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
import { collection, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

const useDeleteImage = (col, colId) => {
  const colRef = collection(db, col);
  const docRef = doc(colRef, colId);
  const mutation = useFirestoreDocumentMutation(docRef, {
    merge: true,
  });

  const deleteImage = async (imagePath, newValues) => {
    mutation.mutate(newValues);
    deleteObject(ref(storage, imagePath));
  };

  return {
    deleteImage,
  };
};

export default useDeleteImage;
