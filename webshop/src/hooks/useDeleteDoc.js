import { db, storage } from "../firebase";
import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

const useDeleteDoc = (col, document) => {
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);

  const deleteDocument = async () => {
    setError(null);
    setIsError(false);
    setIsDeleting(true);

    try {
      if (document.images) {
        await document.images.map((image) => {
          deleteObject(ref(storage, image.path));
        });
      }

      await deleteDoc(doc(db, col, document._id));
      setIsDeleting(false);
    } catch (e) {
      setError(e.message);
      setIsError(true);
      setIsDeleting(false);
    }
  };

  return {
    error,
    isError,
    isDeleting,
    deleteDocument,
  };
};

export default useDeleteDoc;
