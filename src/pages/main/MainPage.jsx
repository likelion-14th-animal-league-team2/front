import DocumentSection from "../../components/coaching/DocumentSection";
import ApplicationSection from "../../components/coaching/ApplicationSection";
import { useMyProfile } from "../../hooks/useUser";

function MainPage() {
  const { data: profile } = useMyProfile();

  return (
    <div className="w-full px-8 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">
          안녕하세요, {profile?.name ?? "회원"}님!
        </h1>
        <p className="text-slate-500 text-sm mb-6">
          오늘도 레주밍과 함께 취업 준비를 이어가 볼까요?
        </p>

        <DocumentSection />
        <ApplicationSection />
      </div>
    </div>
  );
}

export default MainPage;
