import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import RootLayout from "../components/layout/RootLayout";
import RequireAuth from "../components/auth/RequireAuth";
import GuestOnly from "../components/auth/GuestOnly";
import { PATH } from "./paths";

const MainPage = lazy(() => import("../pages/main/MainPage"));
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const MyPage = lazy(() => import("../pages/mypage/MyPage"));
const OnboardingPage = lazy(() => import("../pages/auth/OnboardingPage"));
const ApplicationInfoPage = lazy(() => import("../pages/coaching/ApplicationInfoPage"));
const CoachingHistory = lazy(() => import("../pages/coaching/CoachingHistory"));
const ResumeUpload = lazy(() => import("../pages/coaching/ResumeUpload"));
const CoachingLoadingPage = lazy(() => import("../pages/coaching/CoachingLoadingPage"));
const CoachingResultPage = lazy(() => import("../pages/coaching/CoachingResultPage"));
const AuthKakaoCallbackPage = lazy(() => import("../pages/auth/AuthKaKaoCallbackPage"));

const withSuspense = (Component) => (
  <Suspense fallback={<div>로딩 중...</div>}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    element: <RequireAuth />,
    children: [
      {
        path: PATH.HOME,
        element: <RootLayout />,
        children: [
          { index: true, element: withSuspense(MainPage) },
          { path: PATH.MAIN.slice(1), element: withSuspense(MainPage) },
          { path: PATH.MYPAGE.slice(1), element: withSuspense(MyPage) },
          { path: PATH.APPLICATION_INFO.slice(1), element: withSuspense(ApplicationInfoPage) },
          { path: PATH.COACHING_HISTORY.slice(1), element: withSuspense(CoachingHistory) },
          { path: PATH.RESUME_UPLOAD.slice(1), element: withSuspense(ResumeUpload) },
          { path: PATH.COACHING_LOADING.slice(1), element: withSuspense(CoachingLoadingPage) },
          { path: PATH.COACHING_RESULT.slice(1), element: withSuspense(CoachingResultPage) },
        ],
      },
    ],
  },
  {
    element: <GuestOnly />,
    children: [{ path: PATH.LOGIN, element: withSuspense(LoginPage) }],
  },
  {
    path: PATH.ONBOARDING,
    element: withSuspense(OnboardingPage),
  },
  {
    path: PATH.AUTH_KAKAO_CALLBACK,
    element: withSuspense(AuthKakaoCallbackPage),
  },
]);
