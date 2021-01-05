import React from "react";

const Task = ({ task }) => {
  return (
    <tr>
      <td>{task.title}</td>
      <td>{task.scheduledFor}</td>
      <td>DropDownListOfDrivers</td>
      <td>{task.address}</td>
      <td>{task.lat}</td>
      <td>{task.lon}</td>
      <td>
        <input type="checkbox" />
      </td>
    </tr>
  );
};
export default Task;
