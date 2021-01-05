import { action, makeObservable, observable } from "mobx";
export default class Task {
  _id;
  title;
  scheduledFor;
  location;
  assignedTo = 0;
  display = true;

  constructor(task) {
    makeObservable(this, {
      assignedTo: observable,
      updateAssignedTo: action,
      display: observable,
      toggleCheckbox: action,
    });
    this._id = task._id;
    this.title = task.title;
    this.scheduledFor = task.scheduledFor;
    this.location = task.location;
  }

  updateAssignedTo(driverID) {
    this.assignedTo = driverID;
  }

  toggleCheckbox() {
    this.display = !this.display;
  }
}
