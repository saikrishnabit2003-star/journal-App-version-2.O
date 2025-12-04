import { Link, useNavigate } from "react-router-dom"
import style from './Thirdpage.module.css'
import backButton from '../assets/back.png'
export default function Thirdpage(){
    const nav=useNavigate()
    


    return (
        <>
        <div className={style.page}>

                    


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
                                                            <li>Enter the title in this field to get suggested journals: Type your title to receive relevant journal suggestions.

</li>
                                                            <li>Select the number of journals needed: Choose how many journals you need for your research.
</li>
                                                            <li>Select the appropriate journal to proceed: Pick the most relevant journal from the suggested list.</li>
                                                        </ul>
                                                </div>
                                                </div>
                                                           
                                        </div>
                                    <div className={style.container}>
                                                <div className={style.btncontainer}>
                                                    <button onClick={()=>nav("/AssociateEditor")}>Associate Editor</button>
                                                </div>
                                                <div className={style.detcontainer}>
                                                    <h1>Associate Editor</h1>
                                                     <div>
                                                        <ul>
                                                            <li>Login using ID and password: Access the system by logging in with your ID and password.
</li>
                                                            <li>Enter the title: Input the title to search for relevant journals.
</li>
                                                            <li>Select the appropriate journal to proceed: Pick the most relevant journal from the  suggested list.</li>
                                                        </ul>
                                                </div>
                                                </div>
                                                           
                                        </div>
                                </div>
                    </div>
        
        </div>
        </>
    )
}
