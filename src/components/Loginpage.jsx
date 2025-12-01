import { useEffect, useState } from 'react';
import style from "./Loginpage.module.css"
import { Navigate, useNavigate } from 'react-router-dom';

function Loginpage(){
    const nav=useNavigate()
  const [name,setname]=useState()
  const [password,setpassword]=useState()

  //default username and password
  const username="Admin"
  const pass="Admin@123"

  const auth=(e)=>{
    e.preventDefault();
    if(name===username && password===pass){
     localStorage.setItem("auth", "true"); // Save login status
    nav("/Homepage", { replace: true });
    }
    else{
      alert("username and password incorrect")
      setname("")
      setpassword("")
    }
  }

  useEffect(() => {
    const isAuth = localStorage.getItem("auth");
    if (isAuth === "true") {
      nav("/Homepage", { replace: true });
    }
  }, [nav]);
  return (
   <>
   <div className={style.container}>

    <div className={style.box}>
      <div className={style.msg}>
        <h1>welcome</h1>
      </div>
      <div className={style.forms}>
        <form>
                <label htmlFor="username">USERNAME</label>
                <input type="text" id="username" value={name} placeholder="Enter your name " onChange={(e)=>setname(e.target.value)}/>
                <label htmlFor="password">PASSWORD</label>
                <input type="password" id="password" value={password} name="" placeholder="Enter your password" onChange={(e)=>setpassword(e.target.value)}/>
                <button onClick={auth}>Log in</button>
            </form>
      </div>
    </div>
   </div>
   </>
  );
};

export default Loginpage;
