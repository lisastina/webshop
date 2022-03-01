import { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";
import { doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { changeLetters } from "../helpers/changeLetters";
import { v4 as uuidv4 } from "uuid";

const useAddProduct = () => {
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isAdding, setIsAdding] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const [progress, setProgress] = useState(null);

  const productUuid = uuidv4();

  const addProduct = async (images, product) => {
    setDoc(doc(db, "products", productUuid), {
      created: serverTimestamp(),
      desc: product.desc,
      name: product.name,
      price: product.price,
      type: product.type,
    });

    setError(null);
    setIsError(null);
    setIsSuccess(null);
    setIsAdding(true);

    const productName = changeLetters(
      product.name.split(" ").join("-") +
        "-" +
        product.type.split(" ").join("-")
    );

    /* add every image in firebase storage */
    await images.map(async (image) => {
      if (!image instanceof File) {
        setError("Please upload a file");
        setIsError(true);
        setIsAdding(false);
        return;
      }

      try {
        const ext = image.name.substring(image.name.lastIndexOf(".") + 1);

        const imagePath = `products/${productName}/${productName}.${ext}`;

        const storageRef = ref(storage, imagePath);

        const addProductTask = uploadBytesResumable(storageRef, image);

        addProductTask.on("state_changed", (addProductTaskSnapshot) => {
          setProgress(
            Math.round(
              (addProductTaskSnapshot.bytesTransferred /
                addProductTaskSnapshot.totalBytes) *
                100
            )
          );
        });

        await addProductTask.then();

        const imageUrl = await getDownloadURL(storageRef);

        /* Add image field to the created document */
        await updateDoc(doc(db, "products", productUuid), {
          images: [
            {
              ext: ext,
              name: `${productName}.${ext}`,
              path: imagePath,
              type: image.type,
              url: imageUrl,
            },
          ],
        });

        setProgress(null);
        setIsSuccess(true);
        setIsAdding(false);
      } catch (err) {
        setError(err.message);
        setIsError(true);
        setIsAdding(false);
        setIsSuccess(false);
      }
    });
  };

  return {
    error,
    isError,
    isAdding,
    isSuccess,
    addProduct,
    progress,
  };
};

export default useAddProduct;
