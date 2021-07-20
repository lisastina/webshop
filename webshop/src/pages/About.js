import style from "../css/About.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faGithub } from "@fortawesome/free-brands-svg-icons";

const About = () => {
  return (
    <div className={style.about}>
      <h1>About me</h1>
      <p>
        Hello! My name is Lisa Hansson. I'm studying to become a Front End
        Developer. This website is a personal project where I have explored my
        own abilities and tried learning by doing. <br />
        <br /> Prior to my Front End education I have been studying Graphic
        design and communication, and Photography. The products on this website
        are some of my own projects, both personal and from school.
        Unfortunately you can't actually buy any of my products. Yet! But in the
        meantime I hope that you will enjoy my take on a simple webshop.
      </p>
      <div className={style.social}>
        <a href="https://www.instagram.com/lisastina.h/">
          <FontAwesomeIcon icon={faInstagram} className="fa-2x" />
        </a>
        <a href="https://github.com/lisastina">
          <FontAwesomeIcon icon={faGithub} className="fa-2x" />
        </a>
      </div>
    </div>
  );
};

export default About;
