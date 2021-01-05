import { makeObservable, observable, toJS } from "mobx";
import http from "../../../http-common";
import Driver from "./Driver";
export default class DriversStore {
  driversList = observable.array([]);

  constructor(rootStore) {
    makeObservable(this, {
      driversList: observable,
    });
    this.fetchDrivers();
  }

  get getDriversList() {
    return toJS(this.driversList);
  }

  async fetchDrivers() {
    const { data } = await http.get("drivers");

    this.driversList = observable.array(
      data.map((driver) => new Driver(driver))
    );
    console.log(toJS(this.driversList));
  }
}
