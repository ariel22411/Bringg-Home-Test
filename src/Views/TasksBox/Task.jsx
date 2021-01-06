import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../Stores/Helpers/useStore";
import * as moment from "moment";
const Task = ({ task }) => {
  const {
    dataStore: { driversStore, tasksStore, mapStore },
  } = useStore();

  const toggleDisplayHandler = (e) => {
    if (e.target.checked) {
      let result = { _id: task._id, location: task.location };
      mapStore.addMarker("task", result);
    } else {
      mapStore.deleteMarker(task.location);
    }

    tasksStore.updateDisplayCheckbox(task._id, e.target.checked);
  };

  return (
    <tr>
      <td>{task.title}</td>
      <td>
        {moment(task.scheduledFor, "YYYY-MM-DDTHH:mm:ssZ").format(
          "HH:mm:ss D/M/YY"
        )}
      </td>
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
          <option value={0}>Please select</option>
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
          onChange={(e) => toggleDisplayHandler(e)}
          checked={task.display}
        />
      </td>
    </tr>
  );
};
export default observer(Task);
