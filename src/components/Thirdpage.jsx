import { Link, useNavigate } from "react-router-dom"
import style from './Thirdpage.module.css'
import Logo from "../assets/logo.png"
import text from "../assets/logo_text.png"
import backButton from '../assets/back.png'
export default function Thirdpage(){
    const nav=useNavigate()
    
    const logout = () => {
  localStorage.removeItem("auth");
  nav("/", { replace: true });
};

    return (
        <>
        <div className={style.page}>

                    {/* header */}
                    <div className={style.header}>
                      <div className={style.top}>
                          <img src={Logo} alt="Logo" />
                          <img src={text} alt="text-Logo" />
                          <button id={style.logbtn} onClick={logout}>Log out</button>
                      </div>
                    </div>


                    {/* Body */}
                    <div className={style.body}>
                        <div>
                            <button onClick={()=>nav("/")} className={style.backButton}><img src={backButton}alt="Back" /></button>
                        </div>
                        <div className={style.main_cointainer}>
                                    <div className={style.container}>
                                                <div className={style.btncontainer}>
                                                    <button onClick={()=>nav("/AvailableJournal")}>Available Journal</button>
                                                </div>
                                                <div className={style.detcontainer}>
                                                    <h1>Available Journal</h1>
                                                     <div>
                                                        <ul>
                                                            <li>Upload a .csv file containing the titles and identifiers of the journals you have available.</li>
                                                            <li>The file must use standard CSV format with Journal Name and ISSN as headers, separated by commas.</li>
                                                            <li>The maximum accepted file size is 20MB.</li>
                                                        </ul>
                                                </div>
                                                </div>
                                                           
                                        </div>
                                    <div className={style.container}>
                                                <div className={style.btncontainer}>
                                                    <button onClick={()=>nav("/AssociateEditor")}>AssociateEditor</button>
                                                </div>
                                                <div className={style.detcontainer}>
                                                    <h1>Associate Editor</h1>
                                                     <div>
                                                        <ul>
                                                            <li>Upload a .csv file containing the titles and identifiers of the journals you have available.</li>
                                                            <li>The file must use standard CSV format with Journal Name and ISSN as headers, separated by commas.</li>
                                                            <li>The maximum accepted file size is 20MB.</li>
                                                        </ul>
                                                </div>
                                                </div>
                                                           
                                        </div>
                                </div>
                    </div>
            <div className={style.bottom}></div>

        </div>
        </>
    )
}
