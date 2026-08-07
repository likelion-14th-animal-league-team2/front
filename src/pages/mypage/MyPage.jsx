import { useNavigate } from "react-router-dom";
import { useMyProfile } from "../../hooks/useUser";
import { useAuthStore } from "../../store/useAuthStore";
import { PATH } from "../../routes/paths";
import ProfileCard from "../../components/mypage/ProfileCard";
import AccountInfoCard from "../../components/mypage/AccountInfoCard";
import { IconLogout } from "../../components/common/icons";

function MyPage() {
  const { data: profile, isLoading, isError } = useMyProfile();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate(PATH.LOGIN);
  };

  return (
    <div className="w-full px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-[#173b6b] tracking-tight mb-8">
          마이 페이지
        </h1>

        {isLoading && (
          <p className="text-sm text-slate-400 py-4">불러오는 중...</p>
        )}
        {isError && (
          <p className="text-sm text-red-500 py-4">
            프로필 정보를 불러오지 못했어요.
          </p>
        )}

        {profile && (
          <>
            <ProfileCard profile={profile} />
            <AccountInfoCard profile={profile} />
          </>
        )}

        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-50 border border-[#ffc9c9] text-[#e7000b] rounded-xl px-8 py-3 text-sm font-bold hover:bg-red-100 transition-colors"
          >
            <IconLogout />
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
