import axiosInstance from "./axiosInstance";

export const getApplications = async () => {
  const { data } = await axiosInstance.get("/applications");
  return data; // [{ id, company, role, appliedAt, status, note }]
};

export const getApplicationStats = async () => {
  const { data } = await axiosInstance.get("/applications/stats");
  return data; // { total, inProgress, passed }
};
