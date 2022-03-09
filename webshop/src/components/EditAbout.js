import style from "../css/EditContent.module.css";
import useGetCol from "../hooks/useGetCol";
import { useRef } from "react";

const EditAbout = () => {
  const { data } = useGetCol("about");
  const textRef = useRef();
  const instaRef = useRef();
  const gitRef = useRef();

  return (
    <>
      {data && (
        <div className={style.inputs}>
          <label htmlFor="text">About me</label>
          <textarea
            id="text"
            rows="10"
            required
            ref={textRef}
            maxLength="800"
            defaultValue={data[0].text}
          />
          <label htmlFor="github">Github link</label>
          <input
            id="github"
            type="text"
            defaultValue={data[0].github}
            ref={gitRef}
          />
          <label htmlFor="instagram">Instagram link</label>
          <input
            id="instagram"
            type="text"
            defaultValue={data[0].instagram}
            ref={instaRef}
          />
        </div>
      )}
    </>
  );
};

export default EditAbout;
