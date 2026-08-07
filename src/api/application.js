// TODO: 백엔드 팀 API 연동되면 아래 mock 제거하고 axiosInstance.get(...) 호출로 교체
const MOCK_APPLICATIONS = [
  { id: 1, company: "네이버", role: "프론트엔드 개발자", appliedAt: "2026-07-20", status: "최종합격", note: "1차~3차 완료" },
  { id: 2, company: "카카오", role: "웹 서비스 기획", appliedAt: "2026-07-28", status: "서류진행", note: "서류 검토 중" },
  { id: 3, company: "라인", role: "UI/UX 디자이너", appliedAt: "2026-08-02", status: "지원완료", note: "결과 대기" },
];

const MOCK_STATS = { total: 3, inProgress: 1, passed: 1 };

export const getApplications = async () => {
  return MOCK_APPLICATIONS; // [{ id, company, role, appliedAt, status, note }]
};

export const getApplicationStats = async () => {
  return MOCK_STATS; // { total, inProgress, passed }
};
