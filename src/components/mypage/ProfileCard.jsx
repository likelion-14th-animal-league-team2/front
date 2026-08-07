import { IconUser, IconCalendar, IconEarthAsia } from "../common/icons";

export default function ProfileCard({ profile }) {
  return (
    <section className="bg-white rounded-2xl border border-gray-200 p-8 flex items-center justify-between gap-6">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-[#173b6b]/10 border-4 border-[#173b6b]/10 flex items-center justify-center text-[#173b6b] shrink-0">
          <IconUser width="36" height="41.14" />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl font-bold text-gray-800 tracking-tight">
              {profile.name}
            </span>
            <span className="text-xs font-bold text-[#173b6b] bg-[#173b6b]/10 rounded-full px-3 py-1">
              {profile.membership}
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-2">{profile.email}</p>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1.5">
              <IconCalendar className="text-gray-400" />
              {profile.age}세
            </span>
            <span className="flex items-center gap-1.5">
              <IconEarthAsia className="text-gray-400" />
              {profile.country}
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors shrink-0"
      >
        프로필 수정
      </button>
    </section>
  );
}
