import { useDocuments } from "../../hooks/useDocuments";
import { IconDocument } from "../common/icons";

export default function DocumentList() {
  const { data: documents, isLoading, isError } = useDocuments();

  if (isLoading) {
    return <p className="text-sm text-slate-400 py-4">불러오는 중...</p>;
  }

  if (isError || !documents || documents.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="flex items-center gap-3 rounded-lg border border-slate-100 px-3 py-2.5"
        >
          <div className="w-7 h-7 rounded bg-slate-50 flex items-center justify-center text-slate-400">
            <IconDocument />
          </div>
          <div>
            <p className="text-sm text-slate-800">{doc.name}</p>
            <p className="text-xs text-slate-400">
              {doc.uploadedAt} 업로드 · {doc.type === "resume" ? "이력서" : "자소서"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
