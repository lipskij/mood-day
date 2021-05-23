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

const range = (size) => new Array(size).fill(0).map((_, i) => i + 1);

const daysInMonth = (months, year) => {
  return new Date(year, months, 0).getDate();
};

const currentYear = new Date().getFullYear();

// skaityk sita shuda
// let numDaysInYear = range(12).reduce(
//   (acc, monthNumber) => acc + daysInMonth(monthNumber, currentYear),
//   0
// );

// numDaysInYear = 0;
// for (let monthNumber = 1; monthNumber == 12; monthNumber++) {
//   numDaysInYear += daysInMonth(monthNumber, currentYear);
// }

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Month = () => {

  const allMoods = useTracker(() => {
    Meteor.subscribe("moods");
    const moodDays = MoodsCollection.find({}).fetch();

    const moodsByDay = moodDays.reduce((acc, item) => {
      console.log(item)
      acc[item.date.toISOString()] = item;
      console.log(acc)
      return acc;
    }, {});
    return moodsByDay;
  }, []);

  return (
    <div className='table'>
      {range(12).map((monthNumber) => (
        <div className='container' key={monthNumber}>
          <p>{monthNames[monthNumber - 1]}</p>
          {range(daysInMonth(monthNumber, currentYear)).map((day) => (
            <button
              key={day}
              value={new Date(currentYear, monthNumber - 1, day +1).toISOString()}
              className='square'
              onClick={(e) => {
                e.preventDefault();
                e.persist();
                Meteor.call(
                  "InsertMood",
                  e.target.value,
                  select.value,
                  (error, result) => {
                    Session.set({
                      date: Date,
                      mood: select.value,
                    });
                  }
                );
              }}
            >
              {day}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Month;
