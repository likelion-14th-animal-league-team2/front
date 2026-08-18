import { Navigate, Outlet } from "react-router-dom";
import { PATH } from "../../routes/paths";

function GuestOnly() {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    return <Navigate to={PATH.MAIN} replace />;
  }

  return <Outlet />;
}

export default GuestOnly;
