import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconSparkles, IconCheckCircle, IconShieldCheck } from "../../components/common/icons";
import { PATH } from "../../routes/paths";

const STEPS = [
  { id: "info", label: "지원 정보 확인" },
  { id: "posting", label: "공고 내용 분석" },
  { id: "coaching", label: "맞춤형 코칭 생성" },
];

const STEP_DURATION = 1500;

function CoachingLoadingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep >= STEPS.length) {
      navigate(PATH.COACHING_RESULT);
      return;
    }
    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, STEP_DURATION);
    return () => clearTimeout(timer);
  }, [currentStep, navigate]);

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="flex flex-col items-center justify-center py-10">
        <div className="w-14 h-14 rounded-2xl bg-[#1E2A47] flex items-center justify-center mb-6">
          <IconSparkles />
        </div>

        <h1 className="text-2xl font-extrabold text-[#1E2A47] mb-2 tracking-tight">
          AI 코칭을 준비하고 있어요
        </h1>
        <p className="text-sm text-slate-500 mb-1">
          입력하신 지원 정보와 공고 내용을 분석 중입니다.
        </p>
        <p className="text-xs text-slate-400 mb-8">
          잠시만 기다려 주세요. 약 1~2분 정도 소요됩니다.
        </p>

        <div className="w-full max-w-md space-y-4 mb-8">
          {STEPS.map((step, index) => {
            const isDone = index < currentStep;
            const isActive = index === currentStep;
            return (
              <div key={step.id}>
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-sm ${
                      isDone || isActive
                        ? "text-slate-800 font-medium"
                        : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </span>
                  {isDone ? (
                    <IconCheckCircle />
                  ) : isActive ? (
                    <span className="flex gap-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                    </span>
                  ) : (
                    <span className="w-4 h-4" />
                  )}
                </div>
                <div className="h-1 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      isDone
                        ? "w-full bg-emerald-500"
                        : isActive
                        ? "w-1/2 bg-[#1E2A47]"
                        : "w-0"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
          <IconShieldCheck />
          입력하신 정보는 AI 분석에만 활용됩니다.
        </div>
      </div>

      <footer className="text-center text-xs text-slate-300 py-8">
        © 2026 레주밍
      </footer>
    </div>
  );
}

export default CoachingLoadingPage;
