import style from "../../css/Login.module.css";
import { useRef, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";

const Login = ({ setIsLoggingIn }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);
  const { login } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);

    try {
      await login(emailRef.current.value, passwordRef.current.value);
      setError(null);
      setIsLoggingIn(false);
    } catch (err) {
      setError(err.message);
      setIsLoggingIn(false);
    }
  };

  return (
    <form className={`pages-container ${style.login}`} onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div className={style.input}>
        <label htmlFor="email">Email</label>
        <input
          required
          id="email"
          type="text"
          ref={emailRef}
          onChange={() => setError(null)}
        />
      </div>
      <div className={style.input}>
        <label htmlFor="password">Password</label>
        <input
          required
          id="password"
          type="password"
          ref={passwordRef}
          onChange={() => setError(null)}
        />
      </div>
      {error && (
        <p className={style.errorMessage}>
          {error.includes("auth") ? "Invalid email or password" : error}
        </p>
      )}
      <button className="btn" type="submit">
        Login
      </button>
    </form>
  );
};

export default Login;
