import { action, computed, makeObservable, observable, toJS } from "mobx";
import http from "../../../http-common";
import Driver from "./Driver";
export default class DriversStore {
  driversList = observable.array([]);
  filteredDriversList = observable.array([]);

  constructor(rootStore) {
    makeObservable(this, {
      driversList: observable,
      filteredDriversList: observable,
      getFilteredDriversList: computed,
      fetchDrivers: action,
      filterDriverByName: action,
    });
    this.fetchDrivers();
  }

  get getFilteredDriversList() {
    return toJS(this.filteredDriversList);
  }

  filterDriverByName(searchedName) {
    console.log(toJS(this.driversList));
    this.filteredDriversList = this.driversList.filter((driver) =>
      driver.name.toLowerCase().includes(searchedName.toLowerCase())
    );
  }

  async fetchDrivers() {
    const { data } = await http.get("drivers");

    this.driversList = observable.array(
      data.map((driver) => new Driver(driver))
    );
    this.filteredDriversList = this.driversList.slice(0);
  }
}
