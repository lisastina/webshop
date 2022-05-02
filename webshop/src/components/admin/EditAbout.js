import style from "../../css/EditContent.module.css";
import { useRef } from "react";
import useEditDoc from "../../hooks/useEditDoc";

const EditAbout = ({ about }) => {
  const textRef = useRef();
  const instaRef = useRef();
  const gitRef = useRef();
  const editAbout = useEditDoc("about", about._id);

  const handleSubmit = (e) => {
    e.preventDefault();

    editAbout.editDoc({
      text: textRef.current.value,
      github: gitRef.current.value,
      instagram: instaRef.current.value,
    });
  };

  return (
    <>
      {about && (
        <form onSubmit={handleSubmit}>
          {editAbout.isSuccess && (
            <div className={style.saveAlert}>
              <p>Your changes has been saved!</p>
            </div>
          )}
          <div className={style.inputs}>
            <label htmlFor="text">About me</label>
            <textarea
              id="text"
              rows="10"
              required
              ref={textRef}
              maxLength="800"
              defaultValue={about.text}
              required
              onClick={() => editAbout.setIsSuccess(false)}
            />
            <label htmlFor="github">Github link</label>
            <input
              id="github"
              type="text"
              defaultValue={about.github}
              ref={gitRef}
              required
              onClick={() => editAbout.setIsSuccess(false)}
            />
            <label htmlFor="instagram">Instagram link</label>
            <input
              id="instagram"
              type="text"
              defaultValue={about.instagram}
              ref={instaRef}
              required
              onClick={() => editAbout.setIsSuccess(false)}
            />
          </div>
          <button className={`btn ${style.saveBtn}`} type="submit">
            Save changes
          </button>
        </form>
      )}
    </>
  );
};

export default EditAbout;
