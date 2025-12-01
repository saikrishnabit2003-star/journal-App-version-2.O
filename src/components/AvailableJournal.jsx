import { useNavigate } from "react-router-dom";
import style from "./AvailableJournal.module.css";
import backButton from "../assets//back.png";
import Logo from "../assets/logo.png"
import text from "../assets/logo_text.png"
import { useState } from "react";

export default function AvailableJournal() {
  const nav = useNavigate();
const [rowsLimit, setRowsLimit] = useState(5);

  const [search, setSearch] = useState("");
  const [TableData, setTableData] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState(null);


  const [filters, setFilters] = useState({
    Journal_Login_Status: [],
    Index: [],
    SI_Open: [],
    JCR_Ranking: [],
    UAE_Ranking: [],
    LetPub: [],
    SCIMAGO_Ranking: [],
  });

  const mainItems = [
    "Journal_Login_Status",
    "Index",
    "SI_Open",
    "JCR_Ranking",
    "UAE_Ranking",
    "LetPub",
    "SCIMAGO_Ranking",
  ];

  const subFilters = {
    Journal_Login_Status: [
      "Code Needed",
      "Code not possible",
      "Not possible",
      "Working",
      "Not Working",
    ],
    Index: [
      "ABI",
      "EI",
      "Google Scholar",
      "Google_Scholar",
      "N/A",
      "Non indexed journal",
      "SCIE",
      "Scopus",
      "SIE",
      "SSCI",
    ],
    SI_Open: [
      "Cancelled",
      "Closed",
      "Completed",
      "Dropped",
      "Offline",
      "Open",
      "Out Of Control",
      "Predatory",
      "SI Cancelled",
      "Soon",
      "Suspended",
    ],
    JCR_Ranking: [
      "(Q1,Q2)",
      "(Q1.Q2)",
      "(Q2,Q3)",
      "(Q2.Q3)",
      "(Q3,Q4)",
      "(Q3.Q4)",
      "N/A",
      "Q1",
      "Q1,Q2",
      "Q2",
      "Q2, Q3",
      "Q2,Q3",
      "Q3",
      "Q3,Q4",
      "Q4",
    ],
    UAE_Ranking: [
      "(Q1,Q2)",
      "(Q1.Q2)",
      "(Q2.Q3)",
      "(Q3,Q4)",
      "(Q3.Q4)",
      "N/A",
      "Q1",
      "Q1,Q2",
      "Q2",
      "Q2, Q3",
      "Q2,Q3",
      "Q3",
      "Q3,Q4",
      "Q4",
    ],
    LetPub: ["N/A", "Zone 1", "Zone 2", "Zone 3", "Zone 4"],
    SCIMAGO_Ranking: ["N/A", "Q1", "Q2", "Q3", "Q4"],
  };

  // Handle input typing
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setShowTable(false);
  };

  // FETCH API on Button Click
  const handleFetch = (e) => {
    e.preventDefault();

    fetch("http://13.219.182.76:8000/forward-topic/jornal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: search,top_k:rowsLimit}),
    })
      .then((res) =>res.json())
      .then((data) => {
        
        setTableData(Array.isArray(data.data) ? data.data : []);
        setShowTable(true);
      })
      .catch((err) => console.log("Error:", err));
  };
  
  // Filter selection
  const handleRadioClick = (item) => {
    setSelectedRadio(selectedRadio === item ? null : item);
  };

  const handleCheckbox = (radio, filter) => {
    setFilters((prev) => {
      const isSelected = prev[radio].includes(filter);
      return {
        ...prev,
        [radio]: isSelected
          ? prev[radio].filter((f) => f !== filter)
          : [...prev[radio], filter],
      };
    });
  };

console.log(rowsLimit);

  // Filtered data
  const filteredData = TableData.filter((item) => {
    console.log(item);
    return Object.keys(filters).every((key) => {
      if (filters[key].length === 0) return true;
      return filters[key].includes(item[key]);
    });
  });


  const logout = () => {
  localStorage.removeItem("auth");
  nav("/", { replace: true });
};
  return (
    <div className={style.page}>
        {/* header */}
        <div className={style.header}>
          <div className={style.top}>
              <img src={Logo} alt="Logo" />
              <img src={text} alt="Logo" />
              {/* <h1>Journal Suggestion Application</h1> */}
              <button id={style.logbtn} onClick={logout}>Log out</button>
          </div>
        </div>

        <div className={style.body}>

          <button onClick={() => nav("/Thirdpage")} className={style.backButton}>
            <img src={backButton} alt="Back" />
          </button>

          {/* search area */}
          <div>
              <div className={style.searchContainer}>
                <form>
                  <div>
                        <input
                        type="text"
                        placeholder="Enter text"
                        value={search}
                        required
                        onChange={handleSearchChange} 
                      />
                            
                  <select
                    value={rowsLimit || ""}   // allow empty placeholder
                    onChange={(e) => setRowsLimit(Number(e.target.value))}
                  >
                    {/* Placeholder */}
                    

                    <optgroup label="No. of Rows">
                      {/* <option value={""} >Select number of rows</option> */}
                      <option value={""} hidden>Select number of rows</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={30}>30</option>
                      <option value={40}>40</option>
                      <option value={50}>50</option>
                    </optgroup>
                  </select>
                </div>
                  <button onClick={handleFetch}>Available journals</button>
                </form>

                <div className={style.buttonContainer}>
                  <button type="button" onClick={() => setShowMenu(!showMenu)}>
                    Filter
                  </button>
                  {/* <button type="button" onClick={handleApplyFilters}>
                    Apply Filters
                  </button> */}
                </div>
              </div>

              {/* Filter Menu */}
              {showMenu && (
                <div className={style.menuContainer}>
                  <div className={style.mainrow}>
                    {mainItems.map((item) => (
                      <div key={item} className={style.mainitem}>
                        <label>
                          <input
                            type="radio"
                            checked={selectedRadio === item}
                            onClick={() => handleRadioClick(item)}readOnly
                          />
                          {item}
                        </label>

                        {selectedRadio === item && (
                          <div className="submenu" id={style.submenu}>
                            {subFilters[item].map((filter) => (
                              <label key={filter}>
                                <input
                                  type="checkbox"
                                  checked={filters[item].includes(filter)}
                                  onChange={() => handleCheckbox(item, filter)}
                                />
                                {filter}
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>

          {/* table */}
          <div>
            {showTable && (
        <div className={style.actualTable}>
          <table className={style.actualTableTag} >
            <thead>
              <tr>
                <th>Journal_Name</th>
                <th>Special_Issue_Name</th>
                <th>Similarity_Score</th>
                <th>Journal_Website</th>
                <th>Journal_Login_Status</th>
                <th>SI_Open</th>
                <th>Index</th>
                <th>JCR_Ranking</th>
                <th>UAE_Ranking</th>
                <th>LetPub</th>
                <th>SCIMAGO_Ranking</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.Journal_Name}</td>
                    <td>{item.Special_Issue_Name}</td>
                    <td>{item.Similarity_Score}</td>
                    <td>
                      <a href={item.Journal_Website}>{item.Journal_Website}</a>
                    </td>
                    <td>{item.Journal_Login_Status}</td>
                    <td>{item.SI_Open}</td>
                    <td>{item.Index}</td>
                    <td>{item.JCR_Ranking}</td>
                    <td>{item.UAE_Ranking}</td>
                    <td>{item.LetPub}</td>
                    <td>{item.SCIMAGO_Ranking}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" style={{ textAlign: "center" }}>
                    No matching data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
          </div>

        </div>

        {/* footer */}
        <div className={style.bottom}></div>
























    </div>    
  );
}
