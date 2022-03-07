import { db, storage } from "../firebase";
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
import { collection, doc, updateDoc } from "firebase/firestore";
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
    setImageNumbers([]);

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

      try {
        const ext = image.name.substring(image.name.lastIndexOf(".") + 1);

        const imageNumber = Number(
          imageNumbers.sort()[imageNumbers.length - 1] + 1
        );

        const imagePath = `products/${document.name}-${document.type}/${
          document.name
        }-${document.type}-0${document.images ? imageNumber : i + 1}.${ext}`;

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
        let productImages = [
          ...document.images,
          {
            ext: ext,
            name: `${document.name}-${document.type}-0${
              document.images ? imageNumber : i + 1
            }.${ext}`,
            path: imagePath,
            type: image.type,
            url: imageUrl,
          },
        ];
        mutation.mutate({
          images: productImages,
        });

        // setProgress(null);
        // setIsSuccess(true);
        setIsAdding(false);
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
  };
};

export default useEditDoc;
