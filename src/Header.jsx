import Logo from "./assets/logo.png"
import text from "./assets/logo_text.png"
import "./Header.css"

function Header({ setIsLoggedIn }) {

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);    // <-- Update state
    window.location.href = "/"; 
  };

  return (
    <div>
      <div className="header">
        <div className="top">
         <a href="/homepage"> <img src={Logo} alt="Logo" /></a>
         <a href="/homepage"> <img src={text} alt="Logo" /></a>
          <button id="logbtn" onClick={logout}>Log out</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
