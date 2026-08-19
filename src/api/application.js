// TODO: 백엔드 팀 API 연동되면 getCoachingResults 대신 axiosInstance.get(...) 호출로 교체
import { getCoachingResults } from "../utils/coachingResultStorage";

export const getApplications = async () => {
  return getCoachingResults(); // [{ id, company, role, appliedAt, result }]
};
