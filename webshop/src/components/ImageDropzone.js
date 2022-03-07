import style from "../css/ImageDropzone.module.css";

const UploadImageDropzone = ({
  acceptedFiles,
  fileRejections,
  getInputProps,
  getRootProps,
}) => {
  return (
    <>
      <div
        {...getRootProps()}
        id="image-dropzone"
        className={style.imageDropZone}
      >
        <input {...getInputProps()} />

        {fileRejections.length > 0 ? (
          <p>Do not select more than 3 files</p>
        ) : acceptedFiles?.length > 0 ? (
          <ul className={style.acceptedFiles}>
            {acceptedFiles.map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
        ) : (
          <p>
            Drop your images here or click to browse. <br />
            Up to 3 images accepted.
          </p>
        )}
      </div>
    </>
  );
};

export default UploadImageDropzone;
