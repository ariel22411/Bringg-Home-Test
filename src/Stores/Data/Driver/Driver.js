export default class Driver {
  _id;
  name;
  age;
  location;

  constructor(driver) {
    this._id = driver._id;
    this.name = driver.name;
    this.age = driver.age;
    this.location = driver.location;
  }
}
