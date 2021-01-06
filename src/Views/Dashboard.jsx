import React from "react";
import SearchBox from "./SearchBox/SearchBox";
import Map from "./Map/Map";
import TasksBox from "./TasksBox/TasksBox";
import "./Dashboard.css";
const Dashboard = () => {
  return (
    <div id="dashboard">
      <div className="top">
        <SearchBox />
        <Map />
      </div>
      <div className="bottom pd1">
        <TasksBox />
      </div>
    </div>
  );
};

export default Dashboard;
