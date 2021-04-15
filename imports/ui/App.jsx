import React from "react";
import { MoodsCollection } from "../api/moods";
import { useTracker } from "meteor/react-meteor-data";
import { Session } from "meteor/session";

const colorMap = { happy: "yellow", sad: "grey" };

export const App = () => {
  Date.prototype.getDOY = function () {
    const onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((this - onejan) / 86400000);
  };
  const today = new Date();
  const daynum = today.getDOY().toString();

  let num = [];
  for (let i = 0; i < +daynum; i++) {
    num.push(i + 1);
  }

  const allMoods = useTracker(() => {
    Meteor.subscribe("moods");
    const moodDays = MoodsCollection.find({}).fetch();

    const moodsByDay =  moodDays.reduce((acc, item) => {
      acc[item.day] = item;
      return acc;
    }, {});
    return moodsByDay
  }, []);
  // console.log({num, allMoods, colorMap})
  return (
    <div>
      <h1>Mood Tracker</h1>
      <div>
        <select name='moods' id='select'>
          <option value='happy'>Happy</option>
          <option value='sad'>Sad</option>
        </select>
      </div>
      <input
        type='date'
        name='moodDay'
        min='2021-01-01'
        max='2021-12-31'
        defaultValue={today.toDateString("yyyy-MM-dd")}
      />
      <h1>Today is : {today.toLocaleDateString("lt-LT")}</h1>
      <div className='container'>
        {num.map((item, index) => (
          <button
            style={{backgroundColor: colorMap[allMoods[item]?.mood]}}
            key={index}
            value={item}
            className='squere'
            onClick={(e) => {
              e.preventDefault();
              e.persist();

              Meteor.call(
                "InsertMood",
                e.target.value,
                select.value,
                (error, result) => {
                  Session.set({
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
  );
};
