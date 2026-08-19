import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CoachingBreadcrumb from "../../components/coaching/CoachingBreadcrumb";
import { IconSparkles, IconCheckCircle, IconShieldCheck } from "../../components/common/icons";
import { PATH } from "../../routes/paths";
import { requestResumeAI } from "../../api/resume";
import { useCoachingDraftStore } from "../../store/useCoachingDraftStore";

const STEPS = [
  { id: "info", label: "지원 정보 확인" },
  { id: "posting", label: "공고 내용 분석" },
  { id: "coaching", label: "맞춤형 코칭 생성" },
];

const STEP_INTERVAL = 1400;
const LAST_STEP_MAX_PROGRESS = 90;
const LAST_STEP_TICK = 400;

function CoachingLoadingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [lastStepProgress, setLastStepProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const hasRequested = useRef(false);

  const draft = useCoachingDraftStore((state) => state);
  const setResult = useCoachingDraftStore((state) => state.setResult);

  useEffect(() => {
    if (hasRequested.current) return;
    hasRequested.current = true;

    let stepTimer;
    let lastStepTimer;

    stepTimer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < STEPS.length - 1) return prev + 1;
        clearInterval(stepTimer);
        return prev;
      });
    }, STEP_INTERVAL);

    const startLastStepAnimation = () => {
      lastStepTimer = setInterval(() => {
        setLastStepProgress((prev) => {
          if (prev >= LAST_STEP_MAX_PROGRESS) return prev;
          return prev + 2;
        });
      }, LAST_STEP_TICK);
    };

    const lastStepDelay = setTimeout(
      startLastStepAnimation,
      STEP_INTERVAL * (STEPS.length - 1)
    );

    requestResumeAI({
      resumeText: draft.resumeText,
      resumeImage: draft.resumeImage,
      jobText: draft.jobText,
      jobImage: draft.jobImage,
      targetCountry: draft.targetCountry,
      targetCompany: draft.targetCompany,
    })
      .then((res) => {
        setResult(res.data);
        setCurrentStep(STEPS.length - 1);
        setLastStepProgress(100);
        setTimeout(() => {
          navigate(PATH.COACHING_RESULT);
        }, 400);
      })
      .catch((error) => {
        console.error("AI 코칭 요청 실패:", error);
        setErrorMessage("코칭 결과를 불러오지 못했어요. 다시 시도해 주세요.");
      })
      .finally(() => {
        clearInterval(stepTimer);
        clearInterval(lastStepTimer);
        clearTimeout(lastStepDelay);
      });

    return () => {
      clearInterval(stepTimer);
      clearInterval(lastStepTimer);
      clearTimeout(lastStepDelay);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <CoachingBreadcrumb current="loading" />

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

        {errorMessage && (
          <p className="text-sm text-red-500 mb-6">{errorMessage}</p>
        )}

        <div className="w-full max-w-md space-y-4 mb-8">
          {STEPS.map((step, index) => {
            const isDone = index < currentStep;
            const isActive = index === currentStep;
            const isLastStep = index === STEPS.length - 1;

            let barWidth = "0%";
            if (isDone) {
              barWidth = "100%";
            } else if (isActive) {
              barWidth = isLastStep ? `${lastStepProgress}%` : "50%";
            }

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
                    className={`h-full rounded-full transition-all duration-500 ${
                      isDone ? "bg-emerald-500" : "bg-[#1E2A47]"
                    }`}
                    style={{ width: barWidth }}
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
