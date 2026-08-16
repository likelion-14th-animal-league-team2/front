import DocumentUploadButton from "./DocumentUploadButton";
import DocumentList from "./DocumentList";
import { IconDocument } from "../common/icons";

export default function DocumentSection() {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-[#1E2A47]">
          <IconDocument />
        </div>
        <div>
          <h2 className="font-semibold text-slate-900 text-[15px]">
            이력서·자소서
          </h2>
          <p className="text-xs text-slate-400">
            문서를 업로드하고 AI 코칭을 받아보세요.
          </p>
        </div>
      </div>

      <div className="mb-5">
        <DocumentUploadButton />
      </div>

      <DocumentList />
    </section>
  );
}
