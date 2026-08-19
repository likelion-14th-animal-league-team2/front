import { IconCalendar, IconEarthAsia } from "../common/icons";

export default function ProfileCard({ profile }) {
  return (
    <section className="bg-white rounded-2xl border border-gray-200 p-8">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-2xl font-bold text-gray-800 tracking-tight">
          {profile.name}
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
    </section>
  );
}
