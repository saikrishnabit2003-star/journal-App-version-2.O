import { Link, useNavigate } from "react-router-dom"
import style from "./Upload.module.css"
import backButton from "../assets/backbtn.png"
export default function Uploadpage() {

    const nav=useNavigate()
    const backendPath="http://localhost:5000/upload"

    async function succesmsg() {

  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a CSV file");
    return;
  }

  let heading = document.createElement("h1");
  heading.innerText = "Success";

  let msg = document.getElementById("msg");
  msg.innerHTML = "";
  msg.appendChild(heading);

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch(backendPath, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("Upload success:", data);
  } catch (error) {
    console.error("Upload failed:", error);
  }
}

    return (
        <div className={style.uploadcontainer}>
        <button onClick={()=>nav("/")} className={style.backButton}><img src={backButton}alt="Back" /></button>
        
        <div className={style.title}>
            <h1>UPLOAD DATA</h1>
        </div>

        <div className={style.maincontainer}>
                        <div>
                            <div className={style.uploadspace}>
                                <div>
                                <div class={style.droparea}>
                                    <p>csv here!!</p>
                                    <form>
                                        <input type="file" id="fileInput" accept=".csv" />
                                    </form>
                                </div>
                                        </div>
                                        
                                <button class="upload-btn" onClick={succesmsg}>Upload</button>
                            </div>
                            <div className={style.success} id="msg"></div>
                        </div>
                    
        </div>
        </div>
    )
}