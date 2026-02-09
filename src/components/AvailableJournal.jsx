import { useNavigate } from "react-router-dom";
import style from "./AvailableJournal.module.css";
import backButton from "../assets//back.png";
import { useState, useEffect } from "react";

export default function AvailableJournal() {
  const nav = useNavigate();
  const [rowsLimit, setRowsLimit] = useState(5);

  const [search, setSearch] = useState("");
  const [TableData, setTableData] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState(null);
  const [value, setValue] = useState(0.35);
  const [loading, setLoading] = useState(false);
  
  const [filters, setFilters] = useState({
    Journal_Login_Status: [],
    Index: [],
    SI_Open: [],
    JCR_Ranking: [],
    UAE_Ranking: [],
    LetPub: [],
    SCIMAGO_Ranking: [],
    APC: [],
  });

  const [Modes, setModes] = useState("AUTO");

  // Define filters for PRIMARY/AUTO modes
  const primaryFilters = {
    mainItems: [
      "Journal_Login_Status",
      "Index",
      "SI_Open",
      "JCR_Ranking",
      "UAE_Ranking",
      "LetPub",
      "SCIMAGO_Ranking",
    ],
    subFilters: {
      Journal_Login_Status: [
        "Code Needed",
        "Code not possible",
        "Not possible",
        "Working",
        "Not Working",
      ],
      Index: [
        "EI",
        "Google Scholar",
        "Google_Scholar",
        "N/A",
        "Non indexed journal",
        "SCIE",
        "Scopus",
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
        "(Q2,Q3)",
        "(Q3,Q4)",
        "N/A",
        "Q1",
        "Q1,Q2",
        "Q2",
        "Q2,Q3",
        "Q3",
        "Q3,Q4",
        "Q4",
      ],
      UAE_Ranking: [
        "(Q1,Q2)",
        "(Q3,Q4)",
        "N/A",
        "Q1",
        "Q1,Q2",
        "Q2",
        "Q2,Q3",
        "Q3",
        "Q3,Q4",
        "Q4",
      ],
      LetPub: ["N/A", "Zone 1", "Zone 2", "Zone 3", "Zone 4"],
      SCIMAGO_Ranking: ["N/A", "Q1", "Q2", "Q3", "Q4"],
    },
  };

  // Define filters for ASSOCIATE_ONLY mode
  const associateFilters = {
    mainItems: ["Journal_Login_Status", "Index", "APC"],
    subFilters: {
      Journal_Login_Status: [
        "Code Needed",
        "Code not possible",
        "Working",
        "Not Working",
      ],
      Index: ["EI", "SCIE", "Scopus", "SSCI"],
      APC: ["$2,300", "N/A"],
    },
  };

  // Get current filter configuration based on mode
  const getCurrentFilters = () => {
    return Modes === "ASSOCIATE_ONLY" ? associateFilters : primaryFilters;
  };

  const { mainItems, subFilters } = getCurrentFilters();

  // Clear filters and hide table when mode changes
  useEffect(() => {
    handleClearFilters();
    setSelectedRadio(null);
    setShowTable(false); // Hide the table when mode changes
    
    // DO NOT auto-fetch when mode changes
    // User must click "Click to Search" button to fetch data
  }, [Modes]);

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

    setLoading(true);
    
    fetch("https://journal-suggestion-app-v2.onrender.com/suggest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        title: search, 
        topk: rowsLimit, 
        weak_threshold: value, 
        mode: Modes 
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data);
        setTableData(Array.isArray(data.results) ? data.results : []);
        setShowTable(true);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
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
      APC: [],
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

  // Download CSV function - Works in Excel!
  const handleDownloadResults = () => {
    if (filteredData.length === 0) {
      alert("No data to download!");
      return;
    }

    // CSV Headers - Conditional based on mode
    const headers = Modes === "ASSOCIATE_ONLY"
      ? [
          "S.No",
          "Journal Name",
          "final score",
          "Special Issue keywords",
          "Journal Website",
          "primary domain",
          "Index",
          "Journal Login Status",
          "APC",
          "Published Count ",
          "Rejected Count",
          "source",
        ]
      : [
          "S.No",
          "Journal Name",
          "Similarity Score",
          "Special Issue Name",
          "Primary Domain",
          "Journal Website",
          "Journal Login Status",
          "Index",
          "SI Open",
          "API FEE",
          "Source",
          "Published Count",
          "Rejected Count",
          "JCR Ranking",
          "UAE Ranking",
          "LetPub",
          "SCIMAGO Ranking",
        ];

    // Escape CSV values (handle commas, quotes, newlines)
    const escapeCSV = (value) => {
      if (value === null || value === undefined) return "";
      const stringValue = String(value);
      if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    };

    // Create CSV rows - Conditional based on mode
    const csvRows = [
      headers.join(","), // Header row
      ...filteredData.map((item, index) =>
        Modes === "ASSOCIATE_ONLY"
          ? [
              index + 1,
              escapeCSV(item.Journal_Name),
              escapeCSV(item.final_score),
              escapeCSV(item.Special_Issue_keywords),
              escapeCSV(item.Journal_Website),
              escapeCSV(item.primary_domain),
              escapeCSV(item.Index),
              escapeCSV(item.Journal_Login_Status),
              escapeCSV(item.APC),
              escapeCSV(item.pub_count_j),
              escapeCSV(item.rej_count_j),
              escapeCSV(item.source),
            ].join(",")
          : [
              index + 1,
              escapeCSV(item.Journal_Name),
              escapeCSV(item.Similarity_Score),
              escapeCSV(item.Special_Issue_Name),
              escapeCSV(item.primary_domain),
              escapeCSV(item.Journal_Website),
              escapeCSV(item.Journal_Login_Status),
              escapeCSV(item.Index),
              escapeCSV(item.SI_Open),
              escapeCSV(item.API_FEE),
              escapeCSV(item.source),
              escapeCSV(item.pub_count_j),
              escapeCSV(item.rej_count_j),
              escapeCSV(item.JCR_Ranking),
              escapeCSV(item.UAE_Ranking),
              escapeCSV(item.LetPub),
              escapeCSV(item.SCIMAGO_Ranking),
            ].join(",")
      ),
    ];

    // Create CSV content
    const csvContent = csvRows.join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, -5);
    const fileName = `Journal_Results_${Modes}_${timestamp}.csv`;

    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={style.page}>
      <div className={style.body}>
        {/* search area */}
        <div className={style.mainsearch}>
          {/* <button onClick={() => nav("/")} className={style.backButton}>
            <img src={backButton} alt="Back" />
          </button> */}
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
                  required
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
            
              
            <div className={style.sliderContainer}>
              <div
                className={style.valueBubble}
                style={{ left: `${value * 100}%` }}
              >
                <span>Threshold value is:</span> {value}
              </div>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={style.slider}
              />
              <select value={Modes} onChange={(e) => setModes(e.target.value)}>
                <optgroup label="select the modes" id={style.optgroup}>
                  <option value={""} hidden>
                    Select any one mode
                  </option>
                  <option value={"AUTO"}>Auto</option>
                  <option value={"PRIMARY_ONLY"}>PRIMARY ONLY</option>
                  <option value={"ASSOCIATE_ONLY"}>ASSOCIATE ONLY</option>
                  {/* <option value={"BOTH"}>BOTH</option> */}
                </optgroup>
              </select>
            </div>

           
            <div>
              <div className={style.buttonContainer}>
                <div>
                  <button id={style.searchbtn} onClick={handleFetch} disabled={loading}>
                    {loading ? "Loading..." : "Click to Search"}
                  </button>
                </div>
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
          {loading && (
            <div style={{ 
              textAlign: "center", 
              padding: "40px",
              backgroundColor: "#f0f8ff",
              borderRadius: "8px",
              margin: "20px 0"
            }}>
              <h3 style={{ color: "#0066cc" }}>
                🔄 Loading data...
              </h3>
              <p style={{ color: "#666" }}>Please wait while we fetch the results</p>
            </div>
          )}
          
          {showTable && !loading && (
            <div className={style.actualTable}>
              <div className={style.tableHeader}>
                <h2>
                  Results: {filteredData.length}{" "}
                  {filteredData.length > 1 ? "Journals Found" : "Journal Found"}
                </h2>
                <button 
                  className={style.downloadButton}
                  onClick={handleDownloadResults}
                >
                  Download Results
                </button>
              </div>

              {/* Conditional Table Rendering Based on Mode */}
              {Modes === "ASSOCIATE_ONLY" ? (
                // Associate Only Table
                <table className={style.actualTableTag1}>
                  <thead>         
                    <tr>
                      <th>S.no</th>
                      <th>Journal Name</th>
                      <th>Final Score</th>
                      <th>Special_Issue_keywords</th>
                      <th>Journal Website</th>
                      <th>Index</th>
                      <th>Journal Login Status</th>
                      <th>APC</th>
                      <th>Published count</th>
                      <th>Rejected count</th>
                      <th>Source</th>
                      
                    </tr>
                  </thead>

                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.Journal_Name}</td>
                          <td>{Math.round(item.final_score * 100)}%</td>
                          <td>
                            <div className={style.scrollCell}>
                              {item.Special_Issue_keywords}
                            </div>
                          </td>
                          <td>
                            <a
                              href={item.Journal_Website}
                              target="_blank"
                              rel="noopener noreferrer">
                              View
                            </a>
                          </td>
                          <td>{item.Index}</td>
                          <td>{item.Journal_Login_Status}</td>
                          <td>{item.APC}</td>
                          <td>{item.pub_count_j}</td>
                          <td>{item.rej_count_j}</td>
                          <td>{item.source}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="11" style={{ textAlign: "center", padding: "40px" }}>
                          No matching data found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : (
                // Primary/Auto Table
                <table className={style.actualTableTag}>
                  <thead>
                    <tr>
                      <th>S.no</th>
                      <th>Journal Name</th>
                      <th>Final Score</th>
                      <th>Special Issue Name</th>
                      <th>Journal Website</th>
                      <th>Journal Login Status</th>
                      <th>Index</th>
                      <th>SI Open</th>
                      <th>APC FEE</th>
                      <th>Source</th>
                      <th>Published count</th>
                      <th>Rejected count</th>
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
                          <td>{index + 1}</td>
                          <td>{item.Journal_Name}</td>
                          <td>{Math.round(item.final_score * 100)}%</td>
                          <td>{item.Special_Issue_Name}</td>
                          
                          <td>
                            <a
                              href={item.Journal_Website}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View
                            </a>
                          </td>
                          <td>{item.Journal_Login_Status}</td>
                          <td>{item.Index}</td>
                          <td>{item.SI_Open}</td>
                          <td>{item.APC_Fee}</td>
                          <td>{item.source}</td>
                          <td>{item.pub_count_j}</td>
                          <td>{item.rej_count_j}</td>
                          <td>{item.JCR_Ranking}</td>
                          <td>{item.UAE_Ranking}</td>
                          <td>{item.LetPub}</td>
                          <td>{item.SCIMAGO_Ranking}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="16" style={{ textAlign: "center", padding: "40px" }}>
                          No matching data found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}