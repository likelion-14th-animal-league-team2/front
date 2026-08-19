// TODO: 백엔드 팀 API 연동되면 아래 mock 제거하고 axiosInstance.get(...) 호출로 교체
const MOCK_APPLICATIONS = [];

const MOCK_STATS = { total: 3, inProgress: 1, passed: 1 };

export const getApplications = async () => {
  return MOCK_APPLICATIONS; // [{ id, company, role, appliedAt, status, note }]
};

export const getApplicationStats = async () => {
  return MOCK_STATS; // { total, inProgress, passed }
};
