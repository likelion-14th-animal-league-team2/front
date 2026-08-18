import { Navigate, Outlet } from "react-router-dom";
import { PATH } from "../../routes/paths";

function RequireAuth() {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to={PATH.LOGIN} replace />;
  }

  return <Outlet />;
}

export default RequireAuth;
