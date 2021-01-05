import DriversStore from "./Driver/DriversStore";
import TasksStore from "./Task/TasksStore"
export default class DataStores {
  constructor(rootStore) {
    this.driversStore = new DriversStore(rootStore);
    this.tasksStore = new TasksStore(rootStore);
  }
}
