import React, { useState } from "react";
import Month from "./months";

export const App = () => {

  const today = new Date();

  return (
    <div className='app'>
      <h1>Mood Tracker</h1>

      <div className='color-table'>
        <h4 style={{ backgroundColor: "#f3f851", width: "5rem" }}>Happy</h4>
        <h4 style={{ backgroundColor: "#9b99fd", width: "5rem" }}>Sad</h4>
        <h4 style={{ backgroundColor: "orange", width: "5rem" }}>Excited</h4>
        <h4 style={{ backgroundColor: "#819b82", width: "5rem" }}>Meh</h4>
        <h4 style={{ backgroundColor: "#a09c9f", width: "5rem" }}>Lazy</h4>
        <h4 style={{ backgroundColor: "#e09696", width: "5rem" }}>Angry</h4>
      </div>
      <div className='selectors'>
        <div className='mood-table'>
          <h2>Mood 😎</h2>
          <select name='moods' id='select'>
            <option value='happy'>Happy</option>
            <option value='sad'>Sad</option>
            <option value='excited'>Excited</option>
            <option value='meh'>Mehh</option>
            <option value='lazy'>Lazy</option>
            <option value='angry'>Angry</option>
          </select>
        </div>
      </div>
      <h2>Today is : {today.toLocaleDateString("lt-LT")}</h2>

      <Month />
    </div>
  );
};

// save moods by month (months will have the same days 1-31)
