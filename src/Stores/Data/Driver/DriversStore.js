import { action, computed, makeObservable, observable, toJS } from "mobx";
import http from "../../../http-common";
import Driver from "./Driver";
export default class DriversStore {
  driversList = observable.array([]);
  filteredDriversList = observable.array([]);
  rootStore;
  constructor(rootStore) {
    makeObservable(this, {
      driversList: observable,
      filteredDriversList: observable,
      getFilteredDriversList: computed,
      getDriversList: computed,
      fetchDrivers: action,
      filterDriverByName: action,
      initFilteredArray: action,
    });
    this.fetchDrivers();
    this.initFilteredArray();
    this.rootStore = rootStore;
  }

  get getDriversList() {
    return toJS(this.driversList);
  }

  get getFilteredDriversList() {
    return toJS(this.filteredDriversList);
  }

  filterDriverByName(searchedName) {
    if (searchedName === "") {
      this.initFilteredArray();
      this.rootStore.dataStore.tasksStore.initFilteredArray();
    } else {
      this.filteredDriversList = this.driversList.filter((driver) =>
        driver.name.toLowerCase().includes(searchedName.toLowerCase())
      );
      this.rootStore.dataStore.tasksStore.filterTasks(
        this.filteredDriversList.map((item) => item._id)
      );
    }
  }

  initFilteredArray() {
    this.filteredDriversList = this.driversList.slice(0);
  }

  async fetchDrivers() {
    const { data } = await http.get("drivers");

    this.driversList = observable.array(
      data.map((driver) => new Driver(driver))
    );
    this.initFilteredArray();
  }
}
