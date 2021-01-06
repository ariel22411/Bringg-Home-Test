import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../Stores/Helpers/useStore";
import "./TasksBox.css";
import Task from "./Task";
function TasksBox() {
  const {
    dataStore: { tasksStore },
  } = useStore();
  return (
    <div id="tasks-box">
      <table id="tasks-table">
        <thead className="header-bg">
          <tr>
            <th>Title</th>
            <th>Scheduled for</th>
            <th>Assign to</th>
            <th>Address</th>
            <th>LAT</th>
            <th>LNG</th>
            <th>Display</th>
          </tr>
        </thead>
        <tbody className="box-bg">
          {tasksStore.getFilteredTasksList.map((task) => (
            <Task task={task} key={task._id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default observer(TasksBox);
