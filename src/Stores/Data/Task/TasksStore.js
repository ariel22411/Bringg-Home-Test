import { action, computed, makeObservable, observable, toJS } from "mobx";
import http from "../../../http-common";
import Task from "./Task";

export default class TasksStore {
  tasksList = observable.array([]);
  filteredTasksList = observable.array([]);
  test = observable.array([]);

  constructor(rootStore) {
    makeObservable(this, {
      tasksList: observable,
      filteredTasksList: observable,
      test: observable,
      getTasksList: computed,
      getFilteredTasksList: computed,
      fetchTasks: action,
      updateAssignedDriverIDToTask: action,
      updateDisplayCheckbox: action,
    });
    this.fetchTasks();
  }

  get getTasksList() {
    return toJS(this.tasksList);
  }

  get getFilteredTasksList() {
    return toJS(this.filteredTasksList);
  }

  async fetchTasks() {
    const { data } = await http.get("tasks");
    this.tasksList = observable.array(data.map((task) => new Task(task)));
    this.initFilteredArray();
  }

  filterTasks(driversIDArray) {
    this.filteredTasksList = this.tasksList
      .filter((task) => driversIDArray.includes(task.assignedTo))
      .slice(0);
  }

  initFilteredArray() {
    this.filteredTasksList = this.tasksList.slice(0);
  }
  updateAssignedDriverIDToTask(taskID, driverID) {
    const indexOfTask = this.tasksList.findIndex((task) => task._id === taskID);
    if (indexOfTask !== -1) {
      this.tasksList[indexOfTask].updateAssignedTo(driverID);
    }
    this.initFilteredArray();
  }

  updateDisplayCheckbox(taskID, bool) {
    this.filteredTasksList
      .find((task) => task._id === taskID)
      .toggleCheckbox(bool);
  }
}
