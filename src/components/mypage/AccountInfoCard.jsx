import { useState } from "react";
import { IconUser } from "../common/icons";
import { useUpdateMyProfile } from "../../hooks/useUser";

export default function AccountInfoCard({ profile }) {
  const [overrides, setOverrides] = useState({});
  const [editingField, setEditingField] = useState(null);
  const [draft, setDraft] = useState("");
  const updateProfile = useUpdateMyProfile();

  const values = { ...profile, ...overrides };

  const rows = [
    {
      key: "email",
      label: "이메일",
      desc: "로그인에 사용하는 이메일 주소입니다.",
      value: values.email,
      badge: "인증됨",
    },
    {
      key: "name",
      label: "닉네임",
      desc: "레주밍에서 사용하는 닉네임입니다.",
      value: values.name,
    },
    {
      key: "age",
      label: "나이",
      desc: "맞춤형 AI 코칭에 활용됩니다.",
      value: `${values.age}세`,
      rawValue: values.age,
      type: "number",
      editable: true,
    },
    {
      key: "country",
      label: "거주 국가",
      desc: "해외 취업 지원 시 참고됩니다.",
      value: values.country,
      editable: true,
    },
  ];

  const startEdit = (row) => {
    setEditingField(row.key);
    setDraft(String(row.rawValue ?? row.value));
  };

  const cancelEdit = () => {
    setEditingField(null);
    setDraft("");
  };

  const saveEdit = (row) => {
    const nextValue = row.type === "number" ? Number(draft) : draft;

    updateProfile.mutate({
      age: row.key === "age" ? nextValue : values.age,
      country: row.key === "country" ? nextValue : values.country,
    });

    setOverrides((prev) => ({ ...prev, [row.key]: nextValue }));
    setEditingField(null);
    setDraft("");
  };

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
            key={row.key}
            className={`flex items-center justify-between py-4 gap-4 ${
              i < rows.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <div>
              <p className="text-sm font-bold text-gray-800">{row.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{row.desc}</p>
            </div>

            {editingField === row.key ? (
              <div className="flex items-center gap-2">
                <input
                  type={row.type ?? "text"}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit(row);
                    if (e.key === "Escape") cancelEdit();
                  }}
                  autoFocus
                  className="w-36 border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm outline-none focus:border-[#173b6b]"
                />
                <button
                  type="button"
                  onClick={() => saveEdit(row)}
                  className="text-xs font-bold text-[#173b6b] hover:underline"
                >
                  저장
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="text-xs font-bold text-gray-400 hover:underline"
                >
                  취소
                </button>
              </div>
            ) : (
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
                    onClick={() => startEdit(row)}
                    className="text-xs font-bold text-[#173b6b] hover:underline"
                  >
                    수정
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
