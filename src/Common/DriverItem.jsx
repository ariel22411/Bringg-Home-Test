import React from "react";
import Button from "../Common/Button";
import "./DriverItem.css";
const DriverItem = (
  { driver: { name, img, age, tasksCount = "0" } },
  ...props
) => {
  return (
    <div className="driver-item">
      <div className="driver-details">
        <div className="driver-img">
          <img src={img} alt={name} />
        </div>
        <div className="driver-info">
          <span className="driver-name">{name}</span>
          <span className="driver-small-text">Age: {age}</span>
        </div>
      </div>
      <div className="driver-actions">
        <span className="driver-small-text">Tasks: {tasksCount}</span>
        <div className="driver-buttons">
          <Button name="location" />
          <Button name="remove" />
        </div>
      </div>
    </div>
  );
};
export default DriverItem;
