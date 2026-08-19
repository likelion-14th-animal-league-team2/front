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
  return data;
};

export const requestResumeAI = async ({
  resumeText,
  resumeImage,
  jobText,
  jobImage,
  targetCountry,
  targetCompany,
}) => {
  const formData = new FormData();
  if (resumeText) formData.append("resumeText", resumeText);
  if (resumeImage) formData.append("resumeImage", resumeImage);
  if (jobText) formData.append("jobText", jobText);
  if (jobImage) formData.append("jobImage", jobImage);
  if (targetCountry) formData.append("targetCountry", targetCountry);
  if (targetCompany) formData.append("targetCompany", targetCompany);

  const { data } = await axiosInstance.post("/resume/ai", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 120000,
  });
  return data;
};
