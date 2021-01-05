export const Marker = ({ id, type }) => (
  <div id={`marker-${id}`} className={"marker marker-" + type} />
);
