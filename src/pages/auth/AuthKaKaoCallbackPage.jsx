import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PATH } from "../../routes/paths";

function AuthKakaoCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const redirectUrl = searchParams.get("redirectUrl");
    const isRegistered = searchParams.get("isRegistered") === "true";

    if (!accessToken) {
      navigate(PATH.LOGIN);
      return;
    }

    localStorage.setItem("accessToken", accessToken);

    if (redirectUrl) {
      navigate(redirectUrl);
    } else if (isRegistered) {
      navigate(PATH.MAIN);
    } else {
      navigate(PATH.ONBOARDING);
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-sm text-slate-400">로그인 처리 중...</p>
    </div>
  );
}

export default AuthKakaoCallbackPage;
