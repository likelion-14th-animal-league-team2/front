import { useRef, useState } from "react";
import { useDocumentUpload } from "../../hooks/useDocumentUpload";
import { IconUpload } from "../common/icons";

export default function DocumentUploadButton() {
  const fileInputRef = useRef(null);
  const [pendingFile, setPendingFile] = useState(null);
  const { mutate: upload, isPending } = useDocumentUpload();

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) setPendingFile(file);
    e.target.value = "";
  };

  const handleTypeConfirm = (type) => {
    if (!pendingFile) return;
    upload(
      { file: pendingFile, type },
      { onSuccess: () => setPendingFile(null) }
    );
  };

  return (
    <>
      <button
        onClick={() => fileInputRef.current.click()}
        className="w-full border-2 border-dashed border-slate-200 rounded-xl py-5 flex items-center justify-center gap-2 text-slate-500 text-sm font-medium hover:border-slate-400 hover:bg-slate-50 transition-colors"
      >
        <IconUpload />
        이력서·자소서 제출
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,.jpg,.png"
        hidden
        onChange={handleFileSelect}
      />
      {pendingFile && (
        <DocumentTypeModal
          fileName={pendingFile.name}
          isUploading={isPending}
          onConfirm={handleTypeConfirm}
          onCancel={() => setPendingFile(null)}
        />
      )}
    </>
  );
}

function DocumentTypeModal({ fileName, isUploading, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-5 w-72">
        <p className="text-sm text-slate-600 mb-3 truncate">{fileName}</p>
        <p className="text-sm font-semibold mb-4">문서 종류를 선택하세요</p>
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => onConfirm("resume")}
            disabled={isUploading}
            className="flex-1 border rounded-lg py-2 text-sm hover:bg-slate-50 disabled:opacity-50"
          >
            이력서
          </button>
          <button
            onClick={() => onConfirm("cover_letter")}
            disabled={isUploading}
            className="flex-1 border rounded-lg py-2 text-sm hover:bg-slate-50 disabled:opacity-50"
          >
            자소서
          </button>
        </div>
        <button onClick={onCancel} className="text-xs text-slate-400 w-full">
          취소
        </button>
      </div>
    </div>
  );
}
