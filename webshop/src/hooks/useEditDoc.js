import { db, storage } from "../firebase";
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
import { collection, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { changeLetters } from "../helpers/changeLetters";

const useEditDoc = (col, documentId) => {
  const [error, setError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [imageNumbers, setImageNumbers] = useState([]);
  const colRef = collection(db, col);
  const docRef = doc(colRef, documentId);
  const mutation = useFirestoreDocumentMutation(docRef, {
    merge: true,
  });

  const editDoc = (newValues) => {
    mutation.mutate(newValues);
    setIsSuccess(true);
  };

  const uploadImages = (newImages, document) => {
    setIsAdding(true);
    setError(null);
    setImageNumbers([]);

    newImages.map(async (image, i) => {
      if (!image instanceof File) {
        setError("Please upload a file");
        setIsAdding(false);
        return;
      }

      if (document.images.length >= 3) {
        setError("This product already has 3 images");
        return;
      }

      /* Take the number from each image's name and put in an array */
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

        /* number to add at end of name. Larger than the largest of the current image's numbers */
        const imageNumber = (
          "0" + Number(imageNumbers.sort()[imageNumbers.length - 1] + (i + 1))
        ).slice(-2);

        const imageName = changeLetters(
          document.name.split(" ").join("-") +
            "-" +
            document.type.split(" ").join("-")
        );

        const imagePath = `products/${imageName}/${imageName}-${
          document.images.length > 0
            ? imageNumber
            : ("0" + Number(i + 1)).slice(-2)
        }.${ext}`;

        const storageRef = ref(storage, imagePath);

        const addProductTask = uploadBytesResumable(storageRef, image);

        await addProductTask.then();

        const imageUrl = await getDownloadURL(storageRef);

        /* Add images to the document */
        await updateDoc(doc(db, "products", document._id), {
          images: arrayUnion({
            ext: ext,
            name: `${imageName}-${
              document.images.length > 0
                ? imageNumber
                : ("0" + Number(i + 1)).slice(-2)
            }.${ext}`,
            path: imagePath,
            type: image.type,
            url: imageUrl,
          }),
        });

        setIsAdding(false);
        setImageNumbers([]);
      } catch (err) {
        setError(err.message);
        setIsAdding(false);
      }
    });
  };

  return {
    editDoc,
    uploadImages,
    error,
    isAdding,
    isSuccess,
    setIsSuccess,
  };
};

export default useEditDoc;
