import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import ReactDOM from "react-dom";
import { Marker } from "../../Common/Marker";
import { useStore } from "../../Stores/Helpers/useStore";
import "./Map.css";

const styles = {
  width: "100%",
  height: "100%",
};
const Map = () => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const {
    dataStore: { tasksStore, driversStore },
  } = useStore();
  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [34.89635, 32.04898],
        zoom: 12,
      });

      map.on("load", () => {
        setMap(map);
        map.resize();
      });
      map.on("load", async () => {
        driversStore.getFilteredDriversList.forEach((result) => {
          const { _id, location } = result;
          const markerNode = document.createElement("div");
          ReactDOM.render(<Marker id={_id} type={"driver"} />, markerNode);
          new mapboxgl.Marker(markerNode).setLngLat(location).addTo(map);
        });
        tasksStore.getFilteredTasksList.forEach((result) => {
          const { _id, location } = result;
          const markerNode = document.createElement("div");
          ReactDOM.render(<Marker id={_id} type={"task"} />, markerNode);
          new mapboxgl.Marker(markerNode).setLngLat(location).addTo(map);
        });
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);
  return (
    <div id="map" className="pd1">
      <div ref={(el) => (mapContainer.current = el)} style={styles} />
    </div>
  );
};

export default Map;
