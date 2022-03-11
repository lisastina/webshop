import style from "../css/ImageDropzone.module.css";

const ImageDropzone = ({
  acceptedFiles,
  fileRejections,
  getInputProps,
  getRootProps,
  children,
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
          children[0]
        ) : acceptedFiles?.length > 0 ? (
          <ul className={style.acceptedFiles}>
            {acceptedFiles.map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
        ) : (
          children[1]
        )}
      </div>
    </>
  );
};

export default ImageDropzone;
