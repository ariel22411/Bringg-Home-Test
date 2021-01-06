import { action, makeObservable, observable } from "mobx";
export default class Driver {
  _id;
  name;
  age;
  location;
  img;
  tasksCount = 0;

  constructor(driver) {
    makeObservable(this, {
      tasksCount: observable,
      increaseTasksCount: action,
      decreaseTasksCount: action,
    });
    this._id = driver._id;
    this.name = driver.name;
    this.age = driver.age;
    this.location = driver.location;
    this.img = driver.img;
  }

  increaseTasksCount() {
    this.tasksCount += 1;
  }
  decreaseTasksCount() {
    if (this.tasksCount > 0) this.tasksCount -= 1;
  }
}
