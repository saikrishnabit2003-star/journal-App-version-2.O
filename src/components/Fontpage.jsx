import { useNavigate } from "react-router-dom"
import style from "./Fontpage.module.css"


export default function Fontpage(){
    const nav=useNavigate()
    

    return(
        <>
        <div className={style.page}>

            
            

            {/* body */}
            <div className={style.body}>

                <div className={style.title}>
                    <h1 ><marquee behavior="" direction="" >JOURNAL SUGGESTION APP</marquee></h1>
                </div>

                <div className={style.maincontainer}>
                    <div className={style.container}>
                        <div className={style.btncontainer}>
                            <button onClick={()=>nav("/Uploadpage")}>Upload Data</button>
                        </div>
                        <div className={style.detcontainer}>
                            <h1>Upload File</h1>
                             <div>
                                <ul>
                                    <li>Upload a .csv file containing the titles and identifiers of the journals you have available.
</li>
                            <li>The file must use standard CSV format with Journal Name and ISSN as headers, separated by commas.
</li>
                            <li>The maximum accepted file size is 20MB.</li>
                                </ul>
                        </div>
                        </div>
                       
                    </div>
                    <div className={style.container}>
                        <div className={style.btncontainer}>
                            <button onClick={()=> nav("/Thirdpage")}>Suggest Journal</button>
                        </div>
                        <div className={style.detcontainer}>
                            <h1>Suggest journal</h1>
                            <div>
                                <ul>
                                    <li>To personalized recommendated, simply click the "Suggest Journal" button.
</li>
                                    <li>We will use your reading prefer and existing library to suggest relevant, new publications.
</li>
                                    <li>Discover your next favorite journal based on our intelligent matching algorithm.</li>
                                    </ul>
                        </div>
                        </div>
                    </div>

                </div>

            </div>


            











































            {/* last */}
        </div>
        </>
    )
}