import React, { useState, useRef } from "react";

/* Live Region will announce to the user when the form data is submitted */
const LiveRegion = () => {
  const [message, setMessage] = useState("Nothing here.");
  const inputRef = useRef(null);
  const submitHandler = (event) => {
    event.preventDefault();

    console.log(inputRef.current.value);
    setMessage(inputRef.current.value);
  };

  return (
    <div>
      <div role="status">
        <p>{message}</p>
      </div>
      <form onSubmit={submitHandler}>
        <label>
          Enter text
          <br />
          <input ref={inputRef} type="text" />
        </label>
        <button type="submit">Start</button>
      </form>
    </div>
  );
};

export default LiveRegion;
