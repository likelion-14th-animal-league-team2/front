import { useNavigate } from "react-router-dom";
import CoachingBreadcrumb from "../../components/coaching/CoachingBreadcrumb";
import {
  IconTrendUp,
  IconAlertCircle,
  IconLightbulb,
} from "../../components/common/icons";
import { useCoachingDraftStore } from "../../store/useCoachingDraftStore";
import { PATH } from "../../routes/paths";

const INSIGHT_META = [
  { key: "strengthAnalysis", title: "강점 분석", icon: IconTrendUp, accent: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
  { key: "improvementAreas", title: "보완 필요 영역", icon: IconAlertCircle, accent: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
  { key: "personalizedCoachingInsight", title: "맞춤 코칭 인사이트", icon: IconLightbulb, accent: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
];

function CoachingResultPage() {
  const navigate = useNavigate();
  const result = useCoachingDraftStore((state) => state.result);

  if (!result) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <p className="text-sm text-slate-500 mb-4">
          아직 진단 결과가 없어요. 지원 정보를 다시 입력해 주세요.
        </p>
        <button
          onClick={() => navigate(PATH.APPLICATION_INFO)}
          className="text-sm text-[#1E2A47] font-semibold hover:underline"
        >
          지원 정보 입력하러 가기 →
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <CoachingBreadcrumb current="result" />

      <h1 className="text-2xl font-extrabold text-slate-900 mb-1 tracking-tight">
        AI 진단 결과
      </h1>
      <p className="text-sm text-slate-500 mb-6">
        지원하신 공고와 입력하신 정보를 바탕으로 맞춤 코칭을 준비했어요.
      </p>

      {/* 인사이트 카드 3개 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {INSIGHT_META.map((meta) => {
          const Icon = meta.icon;
          const content = result[meta.key];
          if (!content) return null;
          return (
            <div
              key={meta.key}
              className={`rounded-xl border p-4 ${meta.bg} ${meta.border}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className={meta.accent} />
                <h3 className="text-sm font-semibold text-slate-900">
                  {meta.title}
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                {content}
              </p>
            </div>
          );
        })}
      </div>

      {/* AI 추천 이력서 본문 */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-slate-900">
            AI 추천 이력서 본문
          </h2>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#1E2A47] text-white font-medium">
            AI 추천
          </span>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
          {result.aiRecommendedResumeContent}
        </p>
      </div>

      <footer className="text-center text-xs text-slate-300 py-8">
        © 2026 레주밍
      </footer>
    </div>
  );
}

export default CoachingResultPage;
