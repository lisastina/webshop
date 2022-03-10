import style from "../css/EditContent.module.css";
import { useState } from "react";
import EditAbout from "./EditAbout";
import EditContact from "./EditContact";
import useGetCol from "../hooks/useGetCol";
import EditFrontpage from "./EditFrontpage";

const EditContent = () => {
  const aboutData = useGetCol("about");
  const contactData = useGetCol("contact-info");
  const frontpageData = useGetCol("frontpage");
  const [frontPage, setFrontPage] = useState(true);
  const [about, setAbout] = useState(false);
  const [contact, setContact] = useState(false);

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
        {frontPage && frontpageData?.data && (
          <EditFrontpage data={frontpageData.data[0]} />
        )}
        {about && aboutData?.data && <EditAbout about={aboutData.data[0]} />}
        {contact && contactData?.data && (
          <EditContact contact={contactData.data[0]} />
        )}
      </div>
    </div>
  );
};

export default EditContent;
