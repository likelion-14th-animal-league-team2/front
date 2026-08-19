import { Link } from "react-router-dom";
import { PATH } from "../../routes/paths";

const FLOW = [
  { key: "main", label: "메인 페이지", path: PATH.MAIN },
  { key: "resume", label: "새 이력서 업로드", path: PATH.RESUME_UPLOAD },
  { key: "info", label: "지원 정보 입력", path: PATH.APPLICATION_INFO },
  { key: "loading", label: "AI 코칭 진행 중", path: null },
  { key: "result", label: "진단 결과", path: null },
];

export default function CoachingBreadcrumb({ current }) {
  const currentIndex = FLOW.findIndex((step) => step.key === current);
  const prev = FLOW[currentIndex - 1];
  const currentStep = FLOW[currentIndex];
  const next = FLOW[currentIndex + 1];

  return (
    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
      {prev && (
        <>
          <Link to={prev.path} className="hover:underline">
            {prev.label}
          </Link>
          <span>&gt;</span>
        </>
      )}
      <span className="text-[#1E2A47] font-bold">{currentStep.label}</span>
      {next && (
        <>
          <span>&gt;</span>
          <span>{next.label}</span>
        </>
      )}
    </div>
  );
}
