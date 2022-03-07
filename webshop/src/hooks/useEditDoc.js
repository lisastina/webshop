import { db, storage } from "../firebase";
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
import { collection, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useState, useEffect } from "react";

const useEditDoc = (col, document) => {
  const [error, setError] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [imageNumbers, setImageNumbers] = useState([]);
  const colRef = collection(db, col);
  const docRef = doc(colRef, document._id);
  const mutation = useFirestoreDocumentMutation(docRef, {
    merge: true,
  });

  const editDoc = (newValues) => {
    return mutation.mutate(newValues);
  };

  const uploadImages = (newImages) => {
    setIsAdding(true);
    setError(null);
    setIsError(null);

    newImages.map(async (image, i) => {
      if (!image instanceof File) {
        setError("Please upload a file");
        setIsError(true);
        setIsAdding(false);
        return;
      }

      if (document.images.length >= 3) {
        setError("This product already has 3 images");
        return;
      }

      /* Name the new image with a number at the end, that is higher than the current images numbers */
      setImageNumbers([]);
      if (document.images.length > 0) {
        document.images.map((currentImage) => {
          const imageNumber = Number(
            currentImage.name
              .substring(currentImage.name.lastIndexOf("-") + 1)
              .replace(
                currentImage.name.substring(currentImage.name.lastIndexOf(".")),
                ""
              )
          );

          const copyImageNumbers = imageNumbers;
          copyImageNumbers.push(imageNumber);

          setImageNumbers(copyImageNumbers);
        });
      }

      try {
        const ext = image.name.substring(image.name.lastIndexOf(".") + 1);

        const imageNumber = (
          "0" + Number(imageNumbers.sort()[imageNumbers.length - 1] + 1)
        ).slice(-2);

        const imagePath = `products/${document.name}-${document.type}/${
          document.name
        }-${document.type}-${
          document.images.length > 0
            ? imageNumber
            : ("0" + Number(i + 1)).slice(-2)
        }.${ext}`;

        const storageRef = ref(storage, imagePath);

        const addProductTask = uploadBytesResumable(storageRef, image);

        /*  addProductTask.on("state_changed", (addProductTaskSnapshot) => {
          setProgress(
            Math.round(
              (addProductTaskSnapshot.bytesTransferred /
                addProductTaskSnapshot.totalBytes) *
                100
            )
          );
        }); */

        await addProductTask.then();

        const imageUrl = await getDownloadURL(storageRef);

        /* Add image field to the created document */
        /* let productImages = [
          ...document.images,
          {
            ext: ext,
            name: `${document.name}-${document.type}-${
              document.images.length > 0 ? imageNumber : ("0" + i + 1).slice(-2)
            }.${ext}`,
            path: imagePath,
            type: image.type,
            url: imageUrl,
          },
        ]; */
        await updateDoc(doc(db, "products", document._id), {
          images: arrayUnion({
            ext: ext,
            name: `${document.name}-${document.type}-${
              document.images.length > 0
                ? imageNumber
                : ("0" + Number(i + 1)).slice(-2)
            }.${ext}`,
            path: imagePath,
            type: image.type,
            url: imageUrl,
          }),
        });
        /*    mutation.mutate({
          images: productImages,
        }); */

        // setProgress(null);
        // setIsSuccess(true);
        setIsAdding(false);
        setImageNumbers([]);
      } catch (err) {
        setError(err.message);
        setIsError(true);
        setIsAdding(false);
        // setIsSuccess(false);
      }
    });
  };

  return {
    editDoc,
    uploadImages,
    error,
    isAdding,
  };
};

export default useEditDoc;
