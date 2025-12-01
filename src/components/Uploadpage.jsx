import { useNavigate } from "react-router-dom"
import style from "./Upload.module.css"
import backButton from "../assets/back.png"
import Logo from "../assets/logo.png"
import text from "../assets/logo_text.png"
import { useState } from "react"
export default function Uploadpage() {

    const nav=useNavigate()
    // const val=false;
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [msg, setMsg] = useState("");

    const logout = () => {
  localStorage.removeItem("auth");
  nav("/", { replace: true });
};

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
  e.preventDefault();
  if (!file) {
    alert("Please select a file");
    return;
  }

  setLoading(true);
  setMsg("");

  var formData = new FormData();
  formData.append("file", file);

  fetch("http://13.219.182.76:8000/uploadfile-Journal/", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Journal Upload Success:", data);
      setMsg(data.message);
    })
    .catch((error) => {
      console.error("Upload Error:", error);
      setMsg("Upload failed");
    })
    .finally(() => setLoading(false));
};

console.log(loading,msg)
  // Associate Editor
  const [assfile, asssetFile] = useState(null);
  const asshandleFileChange = (e) => {
    asssetFile(e.target.files[0]);
  };

  const asshandleUpload = (e) => {
  e.preventDefault();
  if (!assfile) {
    alert("Please select a file");
    return;
  }

  setLoading(true);
  setMsg("");

  var formDatas = new FormData();
  formDatas.append("file", assfile);

  fetch("http://13.219.182.76:8000/upload-Assosiate/", {
    method: "POST",
    body: formDatas,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Associate Upload Success:", data);
      setMsg(data.message);
    })
    .catch((error) => {
      console.error("Upload Error:", error);
      setMsg("Upload failed");
    })
    .finally(() => setLoading(false));
};



    return (
       <>
       <div className={style.page}>

        {/* header */}
        <div className={style.header}>
          <div className={style.top}>
              <img src={Logo} alt="Logo" />
              <img src={text} alt="Text-logo" />
              <button id={style.logbtn} onClick={logout}>Log out</button>
          </div>
        </div>

        {/* body */}
        <div className={style.body}>
          <div>
            <button onClick={()=>nav("/")} className={style.backButton}><img src={backButton}alt="Back" /></button>
          </div>

          <div className={style.maincontainer}>
                  <div className={style.uploadspace}>
                    <h2>Upload Journal File</h2>
                      <div>
                          <div className={style.droparea}>
                              <p>{file ? file.name : "csv here!!"}</p>
                              <form>
                                  <input type="file" id="fileInput" accept=".xlsx , .csv" onChange={handleFileChange}/>
                                  <button className="upload-btn" onClick={handleUpload} >Upload</button>
                              </form>
                          </div>
                        </div>  
                  </div>
            </div>
            <div className={style.maincontainer}>
                  <div className={style.uploadspace}>
                    <h2>Upload Associate  File</h2>
                      <div>
                          <div className={style.droparea}>
                              <p>{assfile ? assfile.name : "csv here!!"}</p>
                              <form>
                                  <input type="file" id="fileInput" accept=".xlsx , .csv" onChange={asshandleFileChange}/>
                                  <button className="upload-btn" onClick={asshandleUpload} >Upload</button>
                              </form>
                          </div>
                        </div>  
                  </div>
            </div>
            {loading ? (
<div className={style.loader}></div>
) : (
  msg && (
    <div className={style.message}>
      <h2>{msg}</h2>
    </div>
  )
)}



       </div>
       {/* footer */}
          <div className={style.bottom}></div>
      
      
      
      </div>
       </>
    )
}