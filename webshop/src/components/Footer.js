import style from '../css/Footer.module.css';

const Footer = () => {
    return ( 
        <footer className={style.footer}>
            <div className={style.footerContainer}>
            <div className={style.contact}>
                <h3>LisaStina</h3>
                <address>
                    <a href="mailto:lisastina.hansson@gmail.com">lisastina.hansson@gmail.com</a> 
                    <p>Drottninggatan 4B <br/> 212 11 Malmö </p>
                    <p>070-123 45 67</p>
                </address>
            </div>
            <div className={style.form}>
                <h3>Subscribe for our newsletter</h3>
                <p>Sign up to recieve news and updates.</p>
                <form> 
                    <input type="text" placeholder="Email Address"/>
                    <button type="submit" >Sign up</button>
                </form>
            </div>
            </div>
        </footer>
     );
}
 
export default Footer;