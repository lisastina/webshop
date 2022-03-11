import { db, storage } from "../firebase";
import { collection, doc, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";

const useEditDoc = (documentId) => {
  const [error, setError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const uploadImage = async (image) => {
    setIsAdding(true);
    setError(null);
    setIsSuccess(false);

    if (!image instanceof File) {
      setError("Please upload a file");
      setIsAdding(false);
      return;
    }

    try {
      const ext = image[0].name.substring(image[0].name.lastIndexOf(".") + 1);

      const imagePath = image[0].name;

      const storageRef = ref(storage, imagePath);

      const addProductTask = uploadBytesResumable(storageRef, image[0]);

      await addProductTask.then();

      const imageUrl = await getDownloadURL(storageRef);

      /* Add image to the document */
      await updateDoc(doc(db, "frontpage", documentId), {
        heroImage: {
          ext: ext,
          name: image[0].name,
          path: image[0].name,
          type: image[0].type,
          url: imageUrl,
        },
      });

      setIsAdding(false);
      setIsSuccess(true);
    } catch (err) {
      setError(err.message);
      setIsAdding(false);
      console.log(err.message);
    }
  };

  return {
    uploadImage,
    error,
    isAdding,
    isSuccess,
    setIsSuccess,
  };
};

export default useEditDoc;
