import { useEffect, useState } from "react";
import style from "./Loginpage.module.css";
import { useNavigate } from "react-router-dom";

function Loginpage({ setIsLoggedIn }) {   // ⭐ Receive prop
  const nav = useNavigate();
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");

  // default username and password
  const username = "Admin";
  const pass = "Admin@123";

  const auth = (e) => {
    e.preventDefault();

    if (name === username && password === pass) {
      localStorage.setItem("authToken", "my-fixed-token-12345");  // ⭐ Save token
      setIsLoggedIn(true);                                        // ⭐ Update app state
      nav("/Homepage");                                           // ⭐ Navigate
    } else {
      alert("username and password incorrect");
      setname("");
      setpassword("");
    }
  };

  // ⭐ If already logged in, redirect to homepage
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      setIsLoggedIn(true);
      nav("/Homepage", { replace: true });
    }
  }, [nav, setIsLoggedIn]);

  return (
    <>
      <div className={style.container}>
        <div className={style.box}>
          <div className={style.msg}>
            <h1>Welcome</h1>
          </div>

          <div className={style.forms}>
            <form>
              <label htmlFor="username">USERNAME</label>
              <input
                type="text"
                id="username"
                value={name}
                placeholder="Enter your name"
                onChange={(e) => setname(e.target.value)}
              />

              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                id="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setpassword(e.target.value)}
              />

              <button onClick={auth}>Log in</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Loginpage;
