import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconLogo, IconSearch, IconArrowRight } from "../../components/common/icons";
import { PATH } from "../../routes/paths";
import { completeProfile } from "../../api/auth";

function OnboardingPage() {
  const navigate = useNavigate();
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    try {
      await completeProfile({ age: Number(age), country });
      navigate(PATH.MAIN);
    } catch (err) {
      console.error(err);
      setError("정보 저장에 실패했어요. 잠시 후 다시 시도해 주세요.");
    }
  };

  const handleSkip = () => {
    navigate(PATH.MAIN);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 py-5">
        <div className="flex items-center gap-2">
          <IconLogo />
          <span className="font-semibold text-slate-900">레주밍</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 pt-4 pb-12">
        <h1 className="text-2xl font-bold text-[#1E2A47] mb-3">반가워요!</h1>
        <p className="text-slate-500 text-sm text-center leading-relaxed mb-8">
          이력서를 맞춤 변환해 드리기 위해
          <br />
          몇 가지만 알려주세요.
        </p>

        <div className="w-full max-w-sm space-y-6">
          {/* 나이 */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              나이
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="만 나이 입력"
                className="flex-1 border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1E2A47]"
              />
              <span className="text-sm text-slate-400">만</span>
            </div>
          </div>

          {/* 거주 국가 */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              거주 국가
            </label>
            <div className="relative">
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="국가를 입력해 주세요"
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 pr-9 text-sm outline-none focus:border-[#1E2A47]"
              />
              <IconSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
            <p className="text-xs text-slate-400 mt-1.5">
              해외 거주 중이라면 해당 국가를 선택해 주세요.
            </p>
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          {/* 제출 */}
          <button
            onClick={handleSubmit}
            className="w-full bg-[#1E2A47] text-white rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#16203A] transition-colors"
          >
            확인
            <IconArrowRight />
          </button>

          <button
            onClick={handleSkip}
            className="w-full text-center text-sm text-slate-400 hover:text-slate-600"
          >
            나중에 입력할게요
          </button>
        </div>
      </main>

      <footer className="text-center text-xs text-slate-300 py-6">
        © 2026 레주밍
      </footer>
    </div>
  );
}

export default OnboardingPage;
