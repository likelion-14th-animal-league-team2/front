import { Link } from "react-router-dom";
import { useApplications } from "../../hooks/useApplications";
import { IconChevronRight } from "../common/icons";
import { PATH } from "../../routes/paths";

export default function ApplicationSection() {
  const { data: applications, isLoading, isError } = useApplications();

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mt-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-slate-900 text-[15px]">
          공고 지원 내역
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
      {!isLoading && applications?.length === 0 && (
        <p className="text-sm text-slate-400 py-4">
          아직 지원한 공고가 없어요.
        </p>
      )}

      {applications?.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {applications.map((app) => (
            <div
              key={app.id}
              className="rounded-xl border p-3.5 bg-white border-slate-200"
            >
              <p className="font-semibold text-sm mb-2" style={{ color: "#173B6B" }}>
                {app.company}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">{app.role}</span>
                <span className="text-[11px] text-slate-400">{app.appliedAt}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
