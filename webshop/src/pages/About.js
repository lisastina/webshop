import style from '../css/About.module.css';

const About = () => {
    return ( 
        <div className={style.about}>
            <h1>About me</h1>
            <p>Hello! My name is Lisa Hansson. I'm studying to become a Front End Developer. This website is a personal project where I have explored my own abilities and tried learning by doing. <br/><br/> Prior to my Front End education I have been studying Graphic design and communication, and Photography. The products on this website are some of my own projects, both personal and from school. Unfortunately you can't actually buy any of my products. Yet! But in the meantime I hope that you will enjoy my take on a simple webshop.</p>
        </div>
     );
}
 
export default About;