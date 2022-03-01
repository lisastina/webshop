import style from "../css/AddProductForm.module.css";

const UploadImageDropzone = ({ params }) => {
  return (
    <>
      <div
        {...params.getRootProps()}
        id="image-dropzone"
        className={style.imageDropZone}
      >
        <input {...params.getInputProps()} />

        {params.isDragActive ? (
          params.isDragAccept ? (
            <p>Drop here</p>
          ) : (
            <p>That file type is not accepted</p>
          )
        ) : (
          <p>Drop your images here or click to browse</p>
        )}

        {params.acceptedFiles?.length > 0 && (
          <div className="accepted-files mt-2">
            <ul className="list-unstyled">
              {params.acceptedFiles.map((file) => (
                <li key={file.name}>
                  {file.name} ({Math.round(file.size / 1024)}
                  kb)
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default UploadImageDropzone;
