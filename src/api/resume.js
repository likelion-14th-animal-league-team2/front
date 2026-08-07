import axiosInstance from "./axiosInstance";

export const uploadDocument = async (file, type) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);

  const { data } = await axiosInstance.post("/documents", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const getDocuments = async () => {
  const { data } = await axiosInstance.get("/documents");
  return data; // [{ id, name, type, uploadedAt, coachingStatus }]
};
