import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import RootLayout from "../components/layout/RootLayout";
import { PATH } from "./paths";

const MainPage = lazy(() => import("../pages/main/MainPage"));
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const MyPage = lazy(() => import("../pages/mypage/MyPage"));

const withSuspense = (Component) => (
  <Suspense fallback={<div>로딩 중...</div>}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: <RootLayout />,
    children: [
      { index: true, element: withSuspense(MainPage) },
      { path: PATH.MAIN.slice(1), element: withSuspense(MainPage) },
      { path: PATH.MYPAGE.slice(1), element: withSuspense(MyPage) },
    ],
  },
  {
    path: PATH.LOGIN,
    element: withSuspense(LoginPage),
  },
]);
