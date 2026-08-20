import { Link } from "react-router-dom";
import { useApplications } from "../../hooks/useApplications";
import { IconChevronRight } from "../common/icons";
import { PATH } from "../../routes/paths";

const SUMMARY_MAX_LENGTH = 44;

const summarize = (text) => {
  if (!text) return "";
  return text.length > SUMMARY_MAX_LENGTH
    ? `${text.slice(0, SUMMARY_MAX_LENGTH)}...`
    : text;
};

export default function ApplicationSection() {
  const { data: applications, isLoading, isError } = useApplications();

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mt-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-slate-900 text-[15px]">
          AI 코칭 내역
        </h2>
        <Link
          to={PATH.COACHING_HISTORY}
          className="text-xs text-slate-400 flex items-center gap-0.5 hover:text-slate-600"
        >
          전체 보기 <IconChevronRight />
        </Link>
      </div>

      {isLoading && <p className="text-sm text-slate-400 py-4">불러오는 중...</p>}
      {isError && (
        <p className="text-sm text-red-500 py-4">
          지원 내역을 불러오지 못했어요.
        </p>
      )}
      {applications?.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {applications.map((app) => (
            <Link
              key={app.id}
              to={`${PATH.COACHING_RESULT}?id=${app.id}`}
              className="rounded-xl border p-3.5 bg-white border-slate-200 hover:border-[#173B6B]/40 transition-colors"
            >
              <p className="font-semibold text-sm mb-1" style={{ color: "#173B6B" }}>
                {app.company}
              </p>
              <p className="text-xs text-slate-500 mb-2">
                {summarize(app.result?.personalizedCoachingInsight)}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">{app.role}</span>
                <span className="text-[11px] text-slate-400">{app.appliedAt}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
