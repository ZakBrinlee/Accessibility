import React, { useState, useRef, useEffect } from "react";
import uuid from "uuid";

import "./dropdown.scss";

const Dropdown = ({ activatorText = "Dropdown", items = [] }) => {
  // Use refs are great for managing focus on an element
  const activatorRef = useRef(null);
  const dropdownListRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const wrapKeyHandler = (event) => {
    if (event.key === "Escape" && isOpen) {
      // escape key
      setIsOpen(false);
      activatorRef.current.focus();
    }
  };

  const clickHandler = (event) => {
    setIsOpen(!isOpen);
  };

  const clickOustsideHandler = (event) => {
    if (
      dropdownListRef.current.contains(event.target) ||
      activatorRef.current.contains(event.target)
    ) {
      return;
    }

    setIsOpen();
  };

  // Handle focus to first dropdown element and mouse click outside of dropdown to close
  useEffect(() => {
    if (isOpen) {
      dropdownListRef.current.querySelector("a").focus();

      document.addEventListener("mouseup", clickOustsideHandler);
    } else {
      document.removeEventListener("mousedown", clickOustsideHandler);
    }

    return () => {
      document.removeEventListener("mouseup", clickOustsideHandler);
    };
  }, [isOpen]);

  return (
    <div className="dropdown-wrap" onKeyUp={wrapKeyHandler}>
      <button
        aria-haspopup="true"
        aria-controls="dropdown1"
        onClick={clickHandler}
        ref={activatorRef}
        className="dropdown-activator"
        data-testid="dropdown-activator"
      >
        {activatorText}
      </button>
      <ul
        id="dropdown1"
        ref={dropdownListRef}
        className={`dropdown-itemList ${isOpen ? "active" : ""}`}
        role="list"
        data-testid="dropdown-itemList"
      >
        {items.map((item, index) => {
          return (
            <li key={index} role="listitem">
              <a href={item.url}>item.text</a>
            </li>
          );
        })}
        {items.length === 0 ? <li>No items</li> : null}
      </ul>
    </div>
  );
};
export default Dropdown;
