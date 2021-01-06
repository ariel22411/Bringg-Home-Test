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
      <div className="drivers-list-header header-bg">Drivers List</div>
      <div className="drivers-list-body box-bg">
        {driversStore.getFilteredDriversList.length > 0 ? (
          driversStore.getFilteredDriversList.map((driver) => (
            <DriverItem driver={driver} key={driver._id} />
          ))
        ) : (
          <div className="no-result">
            <p>No result</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default observer(DriversList);
