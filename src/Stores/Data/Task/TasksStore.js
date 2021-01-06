import { action, computed, makeObservable, observable, toJS } from "mobx";
import http from "../../../http-common";
import Task from "./Task";

export default class TasksStore {
  tasksList = observable.array([]);
  filteredTasksList = observable.array([]);
  test = observable.array([]);
  rootStore;
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
    this.rootStore = rootStore;
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

  filterTasks(driversIDArray, searchedName) {
    const lowerCaseSearchedName = searchedName.toLowerCase();
    this.filteredTasksList = this.tasksList.filter(
      (task) =>
        driversIDArray.includes(task.assignedTo) ||
        task.title.toLowerCase().includes(lowerCaseSearchedName)
    );
  }

  initFilteredArray() {
    this.filteredTasksList = this.tasksList.slice(0);
  }
  updateAssignedDriverIDToTask(taskID, driverID) {
    const indexOfTask = this.tasksList.findIndex((task) => task._id === taskID);
    if (indexOfTask === -1) {
      return;
    }
    const task = this.tasksList[indexOfTask];
    if (task.assignedTo)
      this.rootStore.dataStore.driversStore.decreaseTaskCountForDriver(
        task.assignedTo
      );

    task.updateAssignedTo(driverID === "0" ? 0 : driverID);
    if (task.assignedTo) {
      this.rootStore.dataStore.driversStore.increaseTaskCountForDriver(
        task.assignedTo
      );
    }
  }

  updateDisplayCheckbox(taskID, bool) {
    this.tasksList.find((task) => task._id === taskID).toggleCheckbox(bool);
  }
  removeDriverFromTasks(driverID) {
    this.tasksList.forEach((task) => {
      if (task.assignedTo === driverID) {
        task.assignedTo = 0;
      }
    });
  }
}
