import {
  IconTrendUp,
  IconAlertCircle,
  IconLightbulb,
} from "../../components/common/icons";

const INSIGHT_CARDS = [
  {
    id: "strength",
    title: "강점 분석",
    icon: IconTrendUp,
    accent: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    content:
      "프로젝트 기획 및 데이터 분석 역량이 공고에서 요구하는 핵심 역량과 일치해요. 특히 지원자의 협업 경험은 팀워크를 중시하는 조직 문화와 잘 어울립니다.",
  },
  {
    id: "gap",
    title: "보완 필요 영역",
    icon: IconAlertCircle,
    accent: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
    content:
      "공고에 명시된 Java/Spring 경력 요건이 이력서에 상대적으로 약하게 드러나요. 해당 경험을 구체적인 수치와 프로젝트 단위로 강조하는 것이 좋아요.",
  },
  {
    id: "insight",
    title: "맞춤 코칭 인사이트",
    icon: IconLightbulb,
    accent: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    content:
      "서류 합격 가능성을 높이려면 경력 섹션의 성과를 수치화해서 어필하는 것이 효과적이에요. 자기소개서의 지원 동기와 역량을 잇는 연결고리도 더 강화해 보세요.",
  },
];

const RESUME_SKILLS = ["기획", "데이터분석", "Java/Spring", "Figma", "SQL"];

function CoachingResultPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-extrabold text-slate-900 mb-1 tracking-tight">
        AI 진단 결과
      </h1>
      <p className="text-sm text-slate-500 mb-6">
        지원하신 공고와 입력하신 정보를 바탕으로 맞춤 코칭을 준비했어요.
      </p>

      {/* 인사이트 카드 3개 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {INSIGHT_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className={`rounded-xl border p-4 ${card.bg} ${card.border}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className={card.accent} />
                <h3 className="text-sm font-semibold text-slate-900">
                  {card.title}
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {card.content}
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

        <div className="space-y-5">
          <div>
            <p className="text-xs text-slate-400 mb-1">자기소개서</p>
            <p className="text-sm font-semibold text-slate-900 mb-1">지원동기</p>
            <p className="text-sm text-slate-600 leading-relaxed">
              데이터를 기반으로 사용자 경험을 개선하는 일에 가치를 두고
              지원하게 되었습니다. 기존 프로젝트에서 월간 활성 사용자 수를
              23% 향상시키는 결과를 도출했으며, 이 과정에서 팀원들과의
              협업을 통해 데이터 분석 결과를 실제 제품 개선에 반영하는
              경험을 쌓았습니다. 임팩트 있는 서비스를 만드는 레주밍의
              문화와 잘 맞을 것이라 생각하여 지원하게 되었습니다.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900 mb-1">성장 과정</p>
            <p className="text-sm text-slate-600 leading-relaxed">
              2년간 서비스 기획자로 근무하며 데이터를 바탕으로 의사결정하는
              습관을 길렀습니다. 특히 큰 규모의 리뉴얼 프로젝트를 맡아
              사용자 리서치부터 A/B 테스트까지 전 과정을 주도했고, 이
              경험을 통해 문제를 정의하고 해결하는 능력을 키웠습니다.
            </p>
          </div>

          <hr className="border-slate-100" />

          <div>
            <p className="text-xs text-slate-400 mb-1">경력기술서</p>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-slate-900">
                서비스 기획팀 대리
              </p>
              <span className="text-xs text-slate-400">2023.04 - 2026.02</span>
            </div>
            <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
              <li>주요 서비스 리뉴얼 프로젝트 기획 및 총괄 — 사용자 리서치, UX 설계, 개발 협업 진행</li>
              <li>데이터 기반 개선 과제 수행 — 전환율 15% 상승, 이탈률 21% 감소</li>
              <li>Java/Spring 기반 관리자 도구 개선 프로젝트 참여 — 요구사항 정의 및 테스트 담당</li>
            </ul>
          </div>

          <hr className="border-slate-100" />

          <div>
            <p className="text-xs text-slate-400 mb-2">기술 스택</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {RESUME_SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
            <ul className="text-xs text-slate-500 space-y-1 list-disc list-inside">
              <li>Java/Spring 기반 프로젝트 경험으로 공고 요구사항 충족 가능</li>
              <li>협업 도구와 개발 프로세스에 대한 이해 보유</li>
            </ul>
          </div>
        </div>
      </div>

      <footer className="text-center text-xs text-slate-300 py-8">
        © 2026 레주밍
      </footer>
    </div>
  );
}

export default CoachingResultPage;
