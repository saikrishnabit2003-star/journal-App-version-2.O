import { Link, useNavigate } from "react-router-dom"
import style from './AssociateEditor.module.css'
import { useState } from "react";
import backButton from "../assets/backbtn.png"

export default function AssociateEditor() {
  const nav=useNavigate()
  const [showMenu, setShowMenu] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState(null);

  const [filters, setFilters] = useState({
    A: [],
    B: [],
    C: [],
    D: [],
  });

  const mainItems = ["A", "B", "C", "D"];

  const subFilters = {
    A: ["A-filter1", "A-filter2", "A-filter3", "A-filter4"],
    B: ["B-filter1", "B-filter2", "B-filter3", "B-filter4"],
    C: ["C-filter1", "C-filter2", "C-filter3", "C-filter4"],
    D: ["D-filter1", "D-filter2", "D-filter3", "D-filter4"],
  };

  const handleRadioClick = (item) => {
    if (selectedRadio === item) {
      setSelectedRadio(null);
    } else {
      setSelectedRadio(item);
    }
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

  return (
    <div className={style.blockcontainer}>
      
      <button onClick={()=>nav("/Thirdpage")} className={style.backButton}><img src={backButton}alt="Back" /></button>

      {/* FIXED chContainer */}
      <div className={style.chContainer}>
        <input type="text" placeholder="Entered value" />
        <button>Associate Editor</button>
      </div>

      <div className={style.buttonContainer}>
        <button onClick={() => setShowMenu(!showMenu)}>Filter</button>
        <button>Submit</button>
      </div>

      {/* FIX: missing ")" was added below */}
      {showMenu && (
        <div className="menu-container">
          <div className="main-row">
            {mainItems.map((item) => (
              <div key={item} className="main-item">
                <label>
                  <input
                    type="radio"
                    checked={selectedRadio === item}
                    onClick={() => handleRadioClick(item)}
                    readOnly
                  />
                  {item}
                </label>

                {selectedRadio === item && (
                  <div className="submenu">
                    {subFilters[item].map((filter) => (
                      <label key={filter} className="submenu-item">
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
  );
}
