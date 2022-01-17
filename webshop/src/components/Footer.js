import style from "../css/Footer.module.css";
import useGetCol from "../hooks/useGetCol";

const Footer = () => {
  const { data } = useGetCol("contact-info");

  return (
    <footer className={style.footer}>
      {data && (
        <div className={style.footerContainer}>
          <div className={style.contact}>
            <h3>LisaStina</h3>
            <address>
              <a href={`mailto:${data[0].mail}`}>{data[0].mail}</a>
              <p>
                {data[0].street} <br /> {data[0].zipCode} {data[0].city}
              </p>
              <p>{data[0].phone}</p>
            </address>
          </div>
          <div className={style.form}>
            <h3>Subscribe to my newsletter</h3>
            <p>Sign up to receive news and updates.</p>
            <form>
              <input type="text" placeholder="Email Address" />
              <button type="submit" className="btn-sm">
                Sign up
              </button>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
