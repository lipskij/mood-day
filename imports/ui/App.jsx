import React, { useState } from "react";
import { MoodsCollection } from "../api/moods";
import { useTracker } from "meteor/react-meteor-data";
import { Session } from "meteor/session";

const colorMap = {
  happy: "#f3f851",
  sad: "#9b99fd",
  excited: "orange",
  meh: "#819b82",
  angry: "#e09696",
  lazy: "#a09c9f",
};

export const App = () => {
  const [month, setMonth] = useState("");

  Date.prototype.getDOY = function () {
    const year = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((this - year) / 86400000);
  };
  const today = new Date();
  const allDays = today.getDOY().toString();

  // get number of days in selected month
  const daysInMonth = (months, year) => {
    return new Date(year, months, 0).getDate();
  };

  let num = [];
  for (let i = 0; i < +allDays; i++) {
    num.push(i + 1);
  }

  const allMoods = useTracker(() => {
    Meteor.subscribe("moods");
    const moodDays = MoodsCollection.find({}).fetch();

    const moodsByDay = moodDays.reduce((acc, item) => {
      acc[item.day] = item;
      return acc;
    }, {});
    return moodsByDay;
  }, []);

  console.log(daysInMonth(month, 2021));

  return (
    <div className='app'>
      <h1>Mood Tracker</h1>
      <h3>Today is : {today.toLocaleDateString("lt-LT")}</h3>
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
        <div className='month-table'>
          <h2>Month 📅</h2>
          <div className='month-column'>
            <select
              name='months'
              id='months'
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value='1'>January</option>
              <option value='2'>February</option>
              <option value='3'>March</option>
              <option value='4'>April</option>
              <option value='5'>May</option>
              <option value='6'>June</option>
              <option value='7'>July</option>
              <option value='8'>August</option>
              <option value='9'>September</option>
              <option value='10'>October</option>
              <option value='11'>November</option>
              <option value='12'>December</option>
            </select>
          </div>
        </div>
      </div>

      <div className='table'>
        <div className='container'>
          {num.map((item, index) => (
            <button
              style={{ backgroundColor: colorMap[allMoods[item]?.mood] }}
              key={index}
              value={item}
              className='square'
              onClick={(e) => {
                e.preventDefault();
                e.persist();
                Meteor.call(
                  "InsertMood",
                  month,
                  e.target.value,
                  select.value,
                  (error, result) => {
                    Session.set({
                      month: month,
                      day: e.target.value,
                      mood: select.value,
                    });
                  }
                );
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

//render out month when selected
