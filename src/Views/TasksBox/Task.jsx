import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../Stores/Helpers/useStore";
const Task = ({ task }) => {
  const {
    dataStore: { driversStore, tasksStore, mapStore },
  } = useStore();

  const Checked = (e) => {
    if (e.target.checked) {
      let result = { _id: task._id, location: task.location };
      mapStore.addMarker("task", result);
      tasksStore.updateDisplayCheckbox(task._id, true);
    } else {
      mapStore.deleteMarker(task.location);
      tasksStore.updateDisplayCheckbox(task._id, false);
    }
  };

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
      <td>{task.location.lng}</td>
      <td>
        <input
          type="checkbox"
          onChange={(e) => Checked(e)}
          checked={task.display}
        />
      </td>
    </tr>
  );
};
export default observer(Task);
