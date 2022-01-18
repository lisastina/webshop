import style from "../css/Login.module.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(emailRef.current.value, passwordRef.current.value);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <form className={`pages-container ${style.login}`} onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div className={style.input}>
        <label htmlFor="email">Email</label>
        <input required id="email" type="text" ref={emailRef} />
      </div>
      <div className={style.input}>
        <label htmlFor="password">Password</label>
        <input required id="password" type="password" ref={passwordRef} />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
