import React, { useState, useRef, useEffect } from "react";
import uuid from "uuid";

import "./dropdown.scss";

const Dropdown = ({ activatorText = "Dropdown", items = [] }) => {
  // Use refs are great for managing focus on an element
  const activatorRef = useRef(null);
  const dropdownListRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const clickHandler = (event) => {
    setIsOpen(!isOpen);
  };

  const keyHandler = (event) => {
    if (event.key === "Escape" && isOpen) {
      setIsOpen(false);
    }
  };

  const clickOustsideHandler = (event) => {
    // event.target
    if (
      dropdownListRef.current.contains(event.target) ||
      activatorRef.current.contains(event.target)
    ) {
      return;
    } else {
      setIsOpen(false);
    }
  };

  // Handle focus to first dropdown element and mouse click outside of dropdown to close
  useEffect(() => {
    if (isOpen) {
      dropdownListRef.current.querySelector("a").focus();

      document.addEventListener("mousedown", clickOustsideHandler);
    } else {
      document.removeEventListener("mousedown", clickOustsideHandler);
    }
  }, [isOpen]);

  return (
    <div className="dropdown-wrap" onKeyUp={keyHandler}>
      <button
        aria-haspopup="true"
        aria-controls="dropdown1"
        onClick={clickHandler}
        ref={activatorRef}
        className="dropdown-activator"
      >
        {activatorText}
      </button>
      <ul
        id="dropdown1"
        ref={dropdownListRef}
        className={`dropdown-itemList ${isOpen ? "active" : ""}`}
        role="list"
      >
        {items.map((item, index) => {
          return (
            <li key={index} role="listitem">
              <a href={item.url}>item.text</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Dropdown;
