import style from "../css/About.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faGithub } from "@fortawesome/free-brands-svg-icons";
import useGetCol from "../hooks/useGetCol";

const About = () => {
  const colQuery = useGetCol("about");

  return (
    <>
      {colQuery?.data && (
        <div className={style.about}>
          <h1>About me</h1>
          <p>{colQuery?.data[0].text}</p>
          <div className={style.social}>
            <a href={colQuery?.data[0].instagram}>
              <FontAwesomeIcon icon={faInstagram} className="fa-2x" />
            </a>
            <a href={colQuery?.data[0].github}>
              <FontAwesomeIcon icon={faGithub} className="fa-2x" />
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default About;
