import { useNavigate } from "react-router-dom";
import { IconLogo, IconDocCheck, IconGlobeArrow, IconChatBubble } from "../../components/common/icons";
import { useAuthStore } from "../../store/useAuthStore";
import { PATH } from "../../routes/paths";

const ACCENT_DOTS = ["#EF4444", "#2563EB", "#F59E0B", "#22C55E"];

function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleKakaoLogin = () => {
    // TODO: 백엔드 카카오 로그인 API 연동되면 실제 인증 플로우로 교체
    login();
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

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1E2A47] leading-snug mb-5">
          당신의 이력서,
          <br />
          그 나라 방식으로.
        </h1>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-10 max-w-md">
          해외 취업을 준비하는 사람들을 위해
          <br />
          국가별 이력서 형식에 맞게 자연스럽게 변환해드립니다.
        </p>

        <div className="flex items-center justify-center gap-10 mb-10">
          <IconDocCheck />
          <IconGlobeArrow />
        </div>

        <div className="flex items-center gap-2 mb-10">
          {ACCENT_DOTS.map((color, i) => (
            <span
              key={i}
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <button
          onClick={handleKakaoLogin}
          className="flex items-center justify-center gap-2 w-full max-w-xs bg-[#FEE500] text-slate-900 font-semibold rounded-xl py-3.5 hover:bg-[#F5DC00] transition-colors"
        >
          <IconChatBubble />
          카카오로 시작하기
        </button>

        <p className="text-xs text-slate-400 mt-4">3초 만에 이력서 변환 시작</p>
      </main>

      <footer className="text-center text-xs text-slate-300 py-6">
        © 2026 레주밍
      </footer>
    </div>
  );
}

export default LoginPage;
