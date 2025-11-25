import { Link, useNavigate } from "react-router-dom"
import style from './Thirdpage.module.css'
import backButton from '../assets/backbtn.png'
export default function Thirdpage(){
    const nav=useNavigate()
    return (
        <div className={style.container}>
        <button onClick={()=>nav("/")} className={style.backButton}><img src={backButton}alt="Back" /></button>
        {/* <div className={style.title}>
            <h1>Suggest Journal</h1>
        </div> */}
        <div className={style.main_cointainer}>
           {/* <h2>Tittle</h2> */}
           {/* <input type="text" placeholder="Enter Value....." /> */}
            <button onClick={()=>nav("/AvailableJournal")}>Available journals</button>
            <button onClick={()=>nav("/AssociateEditor")}>Associate editor</button>
        </div>
        
    </div>
    )
}
