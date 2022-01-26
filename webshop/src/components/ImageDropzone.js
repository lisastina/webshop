import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import useAddProduct from "../hooks/useAddProduct";
// import ProgressBar from "react-bootstrap/ProgressBar";

const UploadImageDropzone = () => {
  const [images, setImages] = useState(null);

  const addProduct = useAddProduct({
    name: "en ny produkt",
    type: "poster",
    desc: "hello detta är description",
    price: 200,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Got me zum files 😊", acceptedFiles);
    if (!acceptedFiles.length) {
      return;
    }

    addProduct.addProduct(acceptedFiles);
  };

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/gif, image/jpeg, image/png, image/webp",
    handleSubmit,
  });

  useEffect(() => {
    if (acceptedFiles[0]) {
      setImages(acceptedFiles[0]);
    }
  }, [acceptedFiles]);

  return (
    <>
      <div
        {...getRootProps()}
        id="image-dropzone"
        className="text-center"
        style={{ background: "lightgrey" }}
      >
        <input {...getInputProps()} />

        {isDragActive ? (
          isDragAccept ? (
            <p>Drop it like its hot 🔥!</p>
          ) : (
            <p>That file type is not accepted</p>
          )
        ) : (
          <p>Upload images</p>
        )}

        {acceptedFiles?.length && (
          <div className="accepted-files mt-2">
            <ul className="list-unstyled">
              {acceptedFiles.map((file) => (
                <li key={file.name}>
                  {file.name} ({Math.round(file.size / 1024)}
                  kb)
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button onClick={handleSubmit}>add product</button>
    </>
  );
};

export default UploadImageDropzone;
