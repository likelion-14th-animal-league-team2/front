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

// TODO: 백엔드 팀 API 연동되면 아래 mock 제거하고 axiosInstance.get("/documents") 호출로 교체
const MOCK_DOCUMENTS = [
  { id: 1, name: "김레주_이력서.pdf", type: "resume", uploadedAt: "2026-08-01", coachingStatus: "완료" },
  { id: 2, name: "김레주_자기소개서.pdf", type: "cover_letter", uploadedAt: "2026-08-05", coachingStatus: "진행중" },
];

export const getDocuments = async () => {
  return MOCK_DOCUMENTS; // [{ id, name, type, uploadedAt, coachingStatus }]
};
