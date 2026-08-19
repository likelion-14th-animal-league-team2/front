import { useDocuments } from "../../hooks/useDocuments";
import { IconDocument } from "../common/icons";

export default function DocumentList() {
  const { data: documents, isLoading, isError } = useDocuments();

  if (isLoading || isError || !documents || documents.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      {documents.map((doc) => {
        const typeLabel = doc.type === "resume" ? "이력서" : "자소서";
        const badgeStyle =
          doc.type === "resume"
            ? "bg-[#173B6B]/10 text-[#173B6B]"
            : "bg-emerald-50 text-emerald-600";

        return (
          <div
            key={doc.id}
            className="flex items-center justify-between gap-3 rounded-xl bg-gray-50 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#173B6B] flex items-center justify-center text-white shrink-0">
                <IconDocument width="14" height="14" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">{doc.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {doc.uploadedAt} 업로드 · {typeLabel}
                </p>
              </div>
            </div>
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${badgeStyle}`}
            >
              {typeLabel}
            </span>
          </div>
        );
      })}
    </div>
  );
}
