import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../Stores/Helpers/useStore";
const Task = ({ task }) => {
  const {
    dataStore: { driversStore, tasksStore },
  } = useStore();

  return (
    <tr>
      <td>{task.title}</td>
      <td>{task.scheduledFor}</td>
      <td>
        <select
          value={task.assignedTo ? task.assignedTo : 0}
          onChange={(event) =>
            tasksStore.updateAssignedDriverIDToTask(
              task._id,
              event.target.value
            )
          }
        >
          <option value="0">Please select</option>
          {driversStore.getDriversList.map((driver) => (
            <option value={driver._id} key={driver._id}>
              {driver.name}
            </option>
          ))}
        </select>
      </td>
      <td>{task.address}</td>
      <td>{task.location.lat}</td>
      <td>{task.location.lon}</td>
      <td>
        <input type="checkbox" checked={task.display} />
      </td>
    </tr>
  );
};
export default observer(Task);
