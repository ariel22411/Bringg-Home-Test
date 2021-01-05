import React from "react";
import { observer } from "mobx-react-lite";
import DriverItem from "../../Common/DriverItem.jsx";
import { useStore } from "../../Stores/Helpers/useStore";
import "./DriversList.css";
const DriversList = () => {
  const {
    dataStore: { driversStore },
  } = useStore();

  return (
    <div id="drivers-list">
      <div className="drivers-list-header">Drivers List</div>
      <div className="drivers-list-body">
        {driversStore.getFilteredDriversList.map((driver) => (
          <DriverItem driver={driver} key={driver._id} />
        ))}
      </div>
    </div>
  );
};

export default observer(DriversList);
