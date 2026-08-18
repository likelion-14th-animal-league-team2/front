import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PATH } from "../../routes/paths";
import { kakaoLogin } from "../../api/auth";

function AuthKakaoCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const code = searchParams.get("code");

    if (!code) {
      navigate(PATH.LOGIN);
      return;
    }

    kakaoLogin(code)
      .then((res) => {
        const { accessToken, isRegistered } = res.data;
        localStorage.setItem("accessToken", accessToken);

        if (isRegistered) {
          navigate(PATH.MAIN);
        } else {
          navigate(PATH.ONBOARDING);
        }
      })
      .catch((error) => {
        console.error("카카오 로그인 처리 실패:", error);
        setErrorMessage("로그인 처리 중 문제가 발생했어요.");
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-sm text-slate-400">
        {errorMessage || "로그인 처리 중..."}
      </p>
    </div>
  );
}

export default AuthKakaoCallbackPage;
