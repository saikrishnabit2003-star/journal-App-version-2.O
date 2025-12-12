import { useNavigate } from "react-router-dom";
import style from "./AvailableJournal.module.css";
import backButton from "../assets//back.png";
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

  if (!search.trim()) {
    alert("Please enter a title before searching!");
    return;
  }

  fetch("https://journal-suggestion-backend-fastapi.vercel.app/forward-topic/jornal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: search, top_k: rowsLimit }),
  })
    .then((res) => res.json())
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

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      Journal_Login_Status: [],
      Index: [],
      SI_Open: [],
      JCR_Ranking: [],
      UAE_Ranking: [],
      LetPub: [],
      SCIMAGO_Ranking: [],
    });
    setSelectedRadio(null);
  };

  // Remove individual filter
  const removeFilter = (category, filter) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].filter((f) => f !== filter),
    }));
  };

  // Get all active filters
  const getActiveFilters = () => {
    const active = [];
    Object.keys(filters).forEach((key) => {
      filters[key].forEach((filter) => {
        active.push({ category: key, filter });
      });
    });
    return active;
  };

  const activeFilters = getActiveFilters();


  // Filtered data
  const filteredData = TableData.filter((item) => {
    return Object.keys(filters).every((key) => {
      if (filters[key].length === 0) return true;
      return filters[key].includes(item[key]);
    });
  });

  return (
    <div className={style.page}>
      <div className={style.body}>
       

        {/* search area */}
        <div className={style.mainsearch}>
           <button onClick={() => nav("/Thirdpage")} className={style.backButton}>
          <img src={backButton} alt="Back" />
        </button>
          <div className={style.searchContainer}>
            <div>
              <div>
                <input
                  type="text"
                  placeholder="Enter the Title Here!!"
                  value={search}
                  required
                  onChange={handleSearchChange}
                />

                <select
                  value={rowsLimit || ""} // allow empty placeholder
                  onChange={(e) => setRowsLimit(Number(e.target.value))}
                >
                  <optgroup label="No. of Rows" id={style.optgroup}>
                    <option value={""} hidden>
                      Select number of rows
                    </option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                    <option value={50}>50</option>
                  </optgroup>
                </select>
              </div>
            </div>
            <div>
             
              <div className={style.buttonContainer}>
                 <div><button id={style.searchbtn} onClick={handleFetch}>Available journals</button></div>
                    <button type="button" onClick={() => setShowMenu(!showMenu)}>
                      Show filters
                    </button>
                    {activeFilters.length > 0 && (
                      <button
                        type="button"
                        onClick={handleClearFilters}
                        className={style.clearBtn}
                      >
                      Clear All Filters ({activeFilters.length})
                    </button>
                  )}
                </div>
              </div>
            </div>

            

         

          {/* Filter Menu with Overlay */}
          {showMenu && (
            <>
              <div
                className={style.overlay}
                onClick={() => setShowMenu(false)}
              ></div>
              <div className={style.menuContainer}>
                {/* Close Button */}
                <button 
                  className={style.closeButton} 
                  onClick={() => setShowMenu(false)}
                >
                  ✕
                </button>

                <div className={style.mainrow}>
                  {mainItems.map((item) => (
                    <div key={item} className={style.mainitem}>
                      <label>
                        <input
                          type="radio"
                          checked={selectedRadio === item}
                          onClick={() => handleRadioClick(item)}
                          readOnly
                        />
                        {item.replace(/_/g, " ")}
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
            </>
          )}
        </div>
         {/* Active Filters Display */}
          {activeFilters.length > 0 && (
            <div className={style.activeFiltersContainer}>
              <h3>Active Filters:</h3>
              <div className={style.filterTags}>
                {activeFilters.map(({ category, filter }, index) => (
                  <div key={index} className={style.filterTag}>
                    <span className={style.filterCategory}>{category}:</span>
                    <span className={style.filterValue}>{filter}</span>
                    <button
                      onClick={() => removeFilter(category, filter)}
                      className={style.removeFilterBtn}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        
      

        {/* table */}
        
        <div>
          {showTable && (
            
            <div className={style.actualTable}>
                    <tr>
                      <td colSpan="11" style={{ textAlign: "center" }}>
                       {<h2>Results: {filteredData.length} {filteredData.length>1?"Journals Found":"Journal Found"}</h2>}
                      </td>
                    </tr>
              <table className={style.actualTableTag}>
                <thead>
                  <tr>
                    <th>S_no</th>
                    <th>Journal Name</th>
                    <th>Special Issue Name</th>
                    <th>Similarity Score</th>
                    <th>Journal Website</th>
                    <th>Journal Login Status</th>
                    <th>SI Open</th>
                    <th>Index</th>
                    <th>JCR Ranking</th>
                    <th>UAE Ranking</th>
                    <th>LetPub</th>
                    <th>SCIMAGO Ranking</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>{item.Journal_Name}</td>
                        <td>{item.Special_Issue_Name}</td>
                        <td>{item.Similarity_Score}</td>
                        <td>
                          
                           <a href={item.Journal_Website}
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            {item.Journal_Website}
                          </a>
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
                        No matching data found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        </div>

    </div>
  );
}