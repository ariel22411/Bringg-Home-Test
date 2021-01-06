import http from "../http-common";

export const getDrivers = () => {
  return http.get("drivers");
};

export const getTasks = () => {
  return http.get("tasks");
};
