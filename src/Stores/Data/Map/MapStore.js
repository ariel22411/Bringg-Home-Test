import { action, computed, makeObservable, observable, toJS } from "mobx";
import mapboxgl from "mapbox-gl";
import ReactDOM from "react-dom";
import { Marker } from "../../../Common/Marker";
export default class MapStore {
  markers = observable.array([]);
  mapElement = null;
  constructor(rootStore) {
    makeObservable(this, {
      markers: observable,
      getMap: computed,
      addMarkers: action,
      addMarker: action,
      deleteMarker: action,
      initMap: action,
      resetMarkerArray: action,
      setMapElement: action,
    });
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
  }
  get getMap() {
    return toJS(this.mapElement);
  }
  initMap(mapContainer) {
    return new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
      center: [34.89635, 32.04898],
      zoom: 12,
    });
  }
  setMapElement(_map) {
    this.mapElement = _map;
  }
  addMarkers(StoreFunc, type) {
    StoreFunc.forEach((result) => {
      this.addMarker(type, result);
    });
  }

  addMarker(type, result) {
    const { _id, location } = result;
    console.log({ _id, location });
    const markerNode = document.createElement("div");
    ReactDOM.render(<Marker id={_id} type={type} />, markerNode);
    this.markers = [
      ...this.markers,
      new mapboxgl.Marker(markerNode).setLngLat(location).addTo(this.getMap),
    ];
  }
  resetMarkerArray() {
    this.markers.forEach((item) => {
      item.remove();
    });
  }
  deleteMarker(markerLocation) {
    let mark = this.markers.find(
      (item) =>
        item._lngLat.lat === markerLocation.lat &&
        item._lngLat.lng === markerLocation.lng
    );
    mark.remove();
    this.markers.splice(this.markers.indexOf(mark), 1);
  }
}