import style from "../css/LoginPage.module.css";

const LoginPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form
      className={`pages-container ${style.loginPage}`}
      onSubmit={handleSubmit}
    >
      <h1>Login</h1>
      <div className={style.input}>
        <label htmlFor="email">Email</label>
        <input required id="email" type="text" />
      </div>
      <div className={style.input}>
        <label htmlFor="password">Password</label>
        <input required id="password" type="password" />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
