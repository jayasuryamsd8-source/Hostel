import React from "react";
import "../styles/Canteen.css";
import foodData from "../data/canteenMenu";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const meals = ["Breakfast", "Lunch", "Dinner"];

const Canteen = () => {
  return (
    <div className="canteen-container">
      <h1 className="canteen-title">🍽 Weekly Mess Menu🧑‍🍳</h1>

      <div className="menu-table-wrapper">
        <table className="menu-table">
          <thead>
            <tr>
              <th>Day</th>
              {meals.map((meal) => (
                <th key={meal}>{meal}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {days.map((day) => (
              <tr key={day}>
                <td className="day-cell">{day}</td>

                {meals.map((meal) => (
                  <td key={meal}>
                    {(foodData[day]?.[meal] || []).map((food, index) => (
                      <div className="food-card" key={index}>
                        <img src={food.img} alt={food.name} />
                        <span>{food.name}</span>
                      </div>
                    ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Canteen;
