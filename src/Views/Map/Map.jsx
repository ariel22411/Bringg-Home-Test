import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { observer } from "mobx-react-lite";
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
    dataStore: { tasksStore, driversStore, mapStore },
  } = useStore();
  useEffect(() => {
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = mapStore.initMap(mapContainer);
      mapStore.setMapElement(map);
      mapStore.getMap.on("load", () => {
        setMap(mapStore.getMap);
        mapStore.getMap.resize();
      });
      mapStore.getMap.on("load", async () => {
        mapStore.addMarkers(driversStore.getFilteredDriversList, "driver");
        mapStore.addMarkers(
          tasksStore.getFilteredTasksList.filter((task) => task.display),
          "task"
        );
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  useEffect(() => {
    if (map) {
      mapStore.resetMarkerArray();
      mapStore.addMarkers(driversStore.getFilteredDriversList, "driver");
      mapStore.addMarkers(
        tasksStore.getFilteredTasksList.filter((task) => task.display),
        "task"
      );
    }
  }, [driversStore.filteredDriversList, tasksStore.getFilteredTasksList]);

  return (
    <div id="map" className="pd1">
      <div ref={(el) => (mapContainer.current = el)} style={styles} />
    </div>
  );
};

export default observer(Map);
