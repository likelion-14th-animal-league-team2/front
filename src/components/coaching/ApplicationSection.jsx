import { Link } from "react-router-dom";
import { useApplications, useApplicationStats } from "../../hooks/useApplications";
import { IconChevronRight } from "../common/icons";
import { PATH } from "../../routes/paths";

const STATUS_STYLE = {
  최종합격: "bg-emerald-50 text-emerald-700 border-emerald-200",
  서류진행: "bg-slate-100 text-slate-700 border-slate-200",
  지원완료: "bg-slate-100 text-slate-600 border-slate-200",
};

const CARD_STYLE = {
  최종합격: "bg-emerald-50/50 border-emerald-100",
  서류진행: "bg-white border-slate-200",
  지원완료: "bg-white border-slate-200",
};

export default function ApplicationSection() {
  const { data: applications, isLoading, isError } = useApplications();
  const { data: stats } = useApplicationStats();

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

      {stats && (
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="text-center bg-slate-50 rounded-xl py-3">
            <p className="text-xl font-bold text-slate-900">{stats.total}</p>
            <p className="text-xs text-slate-400">지원한 공고</p>
          </div>
          <div className="text-center bg-slate-50 rounded-xl py-3">
            <p className="text-xl font-bold text-slate-900">{stats.inProgress}</p>
            <p className="text-xs text-slate-400">서류 진행</p>
          </div>
          <div className="text-center bg-slate-50 rounded-xl py-3">
            <p className="text-xl font-bold text-emerald-600">{stats.passed}</p>
            <p className="text-xs text-slate-400">최종 합격</p>
          </div>
        </div>
      )}

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
              className={`rounded-xl border p-3.5 ${CARD_STYLE[app.status] ?? "bg-white border-slate-200"}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full border font-medium ${
                    STATUS_STYLE[app.status] ?? "bg-slate-100 text-slate-600 border-slate-200"
                  }`}
                >
                  {app.status}
                </span>
                <span className="text-[11px] text-slate-400">{app.appliedAt}</span>
              </div>
              <p className="font-semibold text-slate-900 text-sm">{app.company}</p>
              <p className="text-xs text-slate-400 mb-2">{app.role}</p>
              <span className="text-xs text-slate-400">{app.note}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
