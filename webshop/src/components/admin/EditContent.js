import style from "../../css/EditContent.module.css";
import { useState } from "react";
import EditAbout from "./EditAbout";
import EditContact from "./EditContact";
import useGetCol from "../../hooks/useGetCol";
import EditFrontpage from "./EditFrontpage";
import useLocalStorage from "../../hooks/useLocalStorage";

const EditContent = () => {
  const aboutData = useGetCol("about");
  const contactData = useGetCol("contact-info");
  const frontpageData = useGetCol("frontpage");
  const [activeLink, setActiveLink] = useLocalStorage(
    "activeLinkEditContent",
    "frontpage"
  );

  return (
    <div className={style.editContent}>
      <h2>Edit content</h2>

      <div className={style.options}>
        <button
          className={
            activeLink === "frontpage"
              ? `${style.active} ${style.link}`
              : style.link
          }
          onClick={() => {
            setActiveLink("frontpage");
          }}
        >
          Frontpage
        </button>
        <button
          className={
            activeLink === "about"
              ? `${style.active} ${style.link}`
              : style.link
          }
          onClick={() => {
            setActiveLink("about");
          }}
        >
          About
        </button>
        <button
          className={
            activeLink === "contact"
              ? `${style.active} ${style.link}`
              : style.link
          }
          onClick={() => {
            setActiveLink("contact");
          }}
        >
          Contact
        </button>
      </div>
      <div className={style.content}>
        {activeLink === "frontpage" && frontpageData?.data && (
          <EditFrontpage data={frontpageData.data[0]} />
        )}
        {activeLink === "about" && aboutData?.data && (
          <EditAbout about={aboutData.data[0]} />
        )}
        {activeLink === "contact" && contactData?.data && (
          <EditContact contact={contactData.data[0]} />
        )}
      </div>
    </div>
  );
};

export default EditContent;
