export const initializeMap = () =>{
    const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [34.89635, 32.04898],
        zoom: 12,
      });
}