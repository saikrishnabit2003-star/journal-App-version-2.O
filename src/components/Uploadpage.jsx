import {useNavigate } from "react-router-dom"
import style from "./Upload.module.css"
import backButton from "../assets/back.png"
// import Logo from "../assets/logo.png"
// import text from "../assets/logo_text.png"
import { useState } from "react"
import gif from "../assets/output-onlinegiftools.gif"
export default function Uploadpage() {

    const nav=useNavigate()
    // const val=false;
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [msg, setMsg] = useState("");
    const [status,setstatus] = useState("");

//     const logout = () => {
//   localStorage.removeItem("auth");
//   nav("/", { replace: true });
// };

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

  fetch("http://127.0.0.1:8000/ingest/primary?reset=true", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      setMsg(data.message);
      setstatus(data.status);
    })
    .catch((error) => {
      console.error("Upload Error:", error);
      setMsg("Upload failed");
      setstatus("ERROR");
    })
    .finally(() => setLoading(false));
};


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

  fetch("http://127.0.0.1:8000/ingest/associate?reset=true", {
    method: "POST",
    body: formDatas,
  })
    .then((response) => response.json())
    .then((data) => {
      setMsg(data.message);
      setstatus(data.status);
    })
    .catch((error) => {
      console.error("Upload Error:", error);
      setMsg("Upload failed");
      setstatus("ERROR");
    })
    .finally(() => setLoading(false));
};

//published history
  const [pubfile, pubsetFile] = useState(null);
  const pubhandleFileChange = (e) => {
    pubsetFile(e.target.files[0]);
  };

const pubhandleUpload = (e) => {
  e.preventDefault();
  if (!pubfile) {
    alert("Please select a file");
    return;
  }

  setLoading(true);
  setMsg("");

  var pubformDatas = new FormData();
  pubformDatas.append("file", pubfile);
  fetch("http://127.0.0.1:8000/ingest/history?reset=true", {
    method: "POST",
    body: pubformDatas,
  })
    .then((response) => response.json())
    .then((data) => {
      setMsg(data.message);
      setstatus(data.status);
    })
    .catch((error) => {
      console.error("Upload Error:", error);
      setMsg("Upload failed");
      setstatus("ERROR");
    })
    .finally(() => setLoading(false));
};

//rejected history
  const [rejfile, rejsetFile] = useState(null);
  const rejhandleFileChange = (e) => {
    rejsetFile(e.target.files[0]);
  };

const rejhandleUpload = (e) => {
  e.preventDefault();
  if (!rejfile) {
    alert("Please select a file");
    return;
  }

  setLoading(true);
  setMsg("");

  var rejformDatas = new FormData();
  rejformDatas.append("file", rejfile);
  fetch("http://127.0.0.1:8000/ingest/history?reset=true", {
    method: "POST",
    body: rejformDatas,
  })
    .then((response) => response.json())
    .then((data) => {
      setMsg(data.message);
      setstatus(data.status);
    })
    .catch((error) => {
      console.error("Upload Error:", error);
      setMsg("Upload failed");
      setstatus("ERROR");
    })
    .finally(() => setLoading(false));
};

  // Close message function
  const handleCloseMessage = () => {
    setMsg("");
    setstatus("");
  };


    return (
       <>
       <div className={style.page}>

        

        {/* body */}
        <div className={style.body}>
          <div>
            <button onClick={()=>nav("/")} className={style.backButton}><img src={backButton}alt="Back" /></button>
          </div>

          <div id={style.fullcontent}>
            <div className={style.maincontainer}>
                  <div className={style.uploadspace}>
                     
                      <div>
                          <div className={style.droparea}>
                              <p>{file ? file.name : "Upload Journal File"}</p>
                              <form>
                                  <input type="file" id="fileInput" accept=".xlsx , .csv" onChange={handleFileChange}/>
                                  <button className="upload-btn" onClick={handleUpload} >Upload</button>
                              </form>
                              <div className={style.centerLink}>
                      <p>Sample Journal File</p>
                      <a href="/files/available-journal-master_export_31-Jan-2026.xlsx" download>Click here</a>
                    </div>
                          </div>
                        </div>  
                  </div>
            </div>

            <div className={style.maincontainer}>
                  <div className={style.uploadspace}>
                     
                   
                      <div>
                          <div className={style.droparea}>
                              <p>{assfile ? assfile.name : "Upload Associate  File"}</p>
                              <form>
                                  <input type="file" id="fileInput" accept=".xlsx , .csv" onChange={asshandleFileChange}/>
                                  <button className="upload-btn" onClick={asshandleUpload} >Upload</button>
                              </form>
                              <div className={style.centerLink}>
                        <p>Sample Associate File</p>
                        <a href="/files/associate-editor_export_31-Jan-2026.xlsx" download>Click here</a>
                      </div>
                          </div>
                        </div>  
                  </div>
            </div>
            <div className={style.maincontainer}>
                  <div className={style.uploadspace}>
                      <div>
                          <div className={style.droparea}>
                              <p>{pubfile ? pubfile.name : "Published History"}</p>
                              <form>
                                  <input type="file" id="fileInput" accept=".xlsx , .csv" onChange={pubhandleFileChange}/>
                                  <button className="upload-btn" onClick={pubhandleUpload} >Upload</button>
                              </form>
                               <div className={style.centerLink}>
                        <p>Sample Published History File</p>
                        <a href="/files/published_history.xlsx" download>Click here</a>
                      </div>
                          </div>
                        </div>  
                  </div>
            </div>

            <div className={style.maincontainer}>
                  <div className={style.uploadspace}>
                      <div>
                          <div className={style.droparea}>
                              <p>{rejfile ? rejfile.name : "Rejected History"}</p>
                              <form>
                                  <input type="file" id="fileInput" accept=".xlsx , .csv" onChange={rejhandleFileChange}/>
                                  <button className="upload-btn" onClick={rejhandleUpload} >Upload</button>
                              </form>
                               <div className={style.centerLink}>
                        <p>Sample Rejected History File</p>
                        <a href="/files/rejected_history.xlsx" download>Click here</a>
                      </div> 
                          </div>
                        </div>  
                  </div>
            </div>
          </div>
          

       </div>

       {/* Full Screen Loading Overlay */}
       {loading && (
        <div className={style.loadingOverlay}>
          <div className={style.loadingContent}>
            <img src={gif} alt="Loading..." />
            <p>Processing your file...</p>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {msg && !loading && (
        <div className={style.messageOverlay} onClick={handleCloseMessage}>
          <div className={style.messageBox} onClick={(e) => e.stopPropagation()}>
            <button className={style.closeButton} onClick={handleCloseMessage}>
              ✕
            </button>
            <div className={style.messageContent}>
              {status === "ERROR" ? (
                <div className={style.errorMessage}>
                  <div className={style.errorIcon}>✗</div>
                  <h2>{msg}</h2>
                </div>
              ) : (
                <div className={style.successMessage}>
                  <div className={style.successIcon}>✓</div>
                  <h2>{msg}</h2>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      </div>
       </>
    )
}