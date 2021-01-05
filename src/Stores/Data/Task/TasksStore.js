import { makeObservable, observable, toJS } from "mobx";
import http from "../../../http-common";
import Task from "./Task";

export default class TasksStore {
  tasksList = observable.array([]);

  constructor(rootStore) {
    makeObservable(this, {
      tasksList: observable,
    });
    this.fetchTasks();
  }

  get getTasksList() {
    return toJS(this.TasksList);
  }

  async fetchTasks() {
    const { data } = await http.get("tasks");

    this.TasksList = observable.array(data.map((task) => new Task(task)));
    console.log(toJS(this.TasksList));
  }
}
