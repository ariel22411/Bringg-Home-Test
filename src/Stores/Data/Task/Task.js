import { action, makeObservable, observable } from "mobx";
export default class Task {
  _id;
  title;
  scheduledFor;
  location;
  assignedTo = 0;
  display = true;
  address;

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
    this.address = task.address;
  }

  updateAssignedTo(driverID) {
    this.assignedTo = driverID;
  }

  toggleCheckbox(bool) {
    this.display = bool;
  }
}
