import DataStores from "./Data/DataStore";
export default class RootStore {
  constructor() {
    this.dataStore = new DataStores(this);
  }
}
