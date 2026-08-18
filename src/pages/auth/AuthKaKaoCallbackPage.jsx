import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PATH } from "../../routes/paths";

const KAKAO_CALLBACK_API_URL = import.meta.env.VITE_KAKAO_CALLBACK_API_URL;

function AuthKakaoCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(false);
  const requestedRef = useRef(false);

  useEffect(() => {
    const code = searchParams.get("code");

    if (!code) {
      navigate(PATH.LOGIN);
      return;
    }

    if (requestedRef.current) return;
    requestedRef.current = true;

    axios
      .get(KAKAO_CALLBACK_API_URL, { params: { code } })
      .then(({ data }) => {
        const { accessToken, isRegistered } = data.data;
        localStorage.setItem("accessToken", accessToken);
        navigate(isRegistered ? PATH.MAIN : PATH.ONBOARDING);
      })
      .catch(() => {
        setError(true);
      });
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-sm text-slate-400">
        {error ? "로그인에 실패했어요. 다시 시도해 주세요." : "로그인 처리 중..."}
      </p>
    </div>
  );
}

export default AuthKakaoCallbackPage;
