import { useNavigate } from "react-router-dom"
import style from "./Fontpage.module.css"


export default function Fontpage(){
    const nav=useNavigate()
    return(
        <div className={style.Fontpage}>
        <div>
            <h1 className={style.title}>JOURNAL SUGGESTION APP</h1>
        </div>
       <div className={style.maincontainer}>
         <div className={style.container}>
            <div>
                <h1>OPTION 1</h1>
            </div>
            <button onClick={()=>nav("/Uploadpage")}>Upload Data</button>
        </div>
        <div className={style.container}>
             <div>
                <h1>OPTION 2</h1>
            </div>
            <button onClick={()=> nav("/Thirdpage")}>Suggest Journal</button>
        </div>
       </div>

       

       <div className={style.bottom}></div>
    </div>
    )
}