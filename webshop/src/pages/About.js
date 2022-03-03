import style from "../css/About.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faGithub } from "@fortawesome/free-brands-svg-icons";
import useGetCol from "../hooks/useGetCol";

const About = () => {
  const { data } = useGetCol("about");

  return (
    <div className="pages-container">
      {data && (
        <div className={style.about}>
          <h1>About me</h1>
          <p>{data[0].text}</p>
          <div className={style.social}>
            <a href={data[0].instagram}>
              <FontAwesomeIcon icon={faInstagram} className="fa-2x" />
            </a>
            <a href={data[0].github}>
              <FontAwesomeIcon icon={faGithub} className="fa-2x" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
