import DriversStore from "./Driver/DriversStore";
import TasksStore from "./Task/TasksStore";
import MapStore from "./Map/MapStore";
export default class DataStores {
  constructor(rootStore) {
    this.driversStore = new DriversStore(rootStore);
    this.tasksStore = new TasksStore(rootStore);
    this.mapStore = new MapStore(rootStore);
  }
}
