import style from "../css/EditContent.module.css";
import { useState } from "react";
import EditAbout from "./EditAbout";
import EditContact from "./EditContact";

const EditContent = () => {
  const [frontPage, setFrontPage] = useState(false);
  const [about, setAbout] = useState(false);
  const [contact, setContact] = useState(true);

  return (
    <div className={style.editContent}>
      <h2>Edit content</h2>

      <div className={style.options}>
        <button
          className={frontPage ? `${style.active} ${style.link}` : style.link}
          onClick={() => {
            setFrontPage(true);
            setAbout(false);
            setContact(false);
          }}
        >
          Frontpage
        </button>
        <button
          className={about ? `${style.active} ${style.link}` : style.link}
          onClick={() => {
            setFrontPage(false);
            setAbout(true);
            setContact(false);
          }}
        >
          About
        </button>
        <button
          className={contact ? `${style.active} ${style.link}` : style.link}
          onClick={() => {
            setFrontPage(false);
            setAbout(false);
            setContact(true);
          }}
        >
          Contact
        </button>
      </div>
      <div className={style.content}>
        {frontPage && <></>}
        {about && <EditAbout />}
        {contact && <EditContact />}
      </div>
    </div>
  );
};

export default EditContent;
