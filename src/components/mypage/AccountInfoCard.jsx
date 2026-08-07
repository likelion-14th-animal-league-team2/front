import { IconUser } from "../common/icons";

export default function AccountInfoCard({ profile }) {
  const rows = [
    {
      label: "이메일",
      desc: "로그인에 사용하는 이메일 주소입니다.",
      value: profile.email,
      badge: "인증됨",
    },
    {
      label: "닉네임",
      desc: "레주밍에서 사용하는 닉네임입니다.",
      value: profile.name,
      editable: true,
    },
    {
      label: "나이",
      desc: "맞춤형 AI 코칭에 활용됩니다.",
      value: `${profile.age}세`,
      editable: true,
    },
    {
      label: "거주 국가",
      desc: "해외 취업 지원 시 참고됩니다.",
      value: profile.country,
      editable: true,
    },
  ];

  return (
    <section className="bg-white rounded-2xl border border-gray-200 p-8 mt-4">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-11 h-11 rounded-xl bg-[#173b6b]/5 flex items-center justify-center text-[#173b6b] shrink-0">
          <IconUser />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#173b6b]">계정 정보</h2>
          <p className="text-sm text-gray-500">
            개인 정보와 계정 설정을 관리하세요.
          </p>
        </div>
      </div>

      <div className="mt-2">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`flex items-center justify-between py-4 ${
              i < rows.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <div>
              <p className="text-sm font-bold text-gray-800">{row.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{row.desc}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">{row.value}</span>
              {row.badge && (
                <span className="text-xs font-bold text-[#173b6b] bg-[#173b6b]/10 rounded-full px-3 py-1">
                  {row.badge}
                </span>
              )}
              {row.editable && (
                <button
                  type="button"
                  className="text-xs font-bold text-[#173b6b] hover:underline"
                >
                  수정
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
