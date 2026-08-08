import { useRef } from "react";
import { Link } from "react-router-dom";
import { useDocumentUpload } from "../../hooks/useDocumentUpload";
import { IconUpload } from "../common/icons";
import { PATH } from "../../routes/paths";

export default function DocumentUploadButton() {
  const { mutate: upload, isPending } = useDocumentUpload();

  return (
    <div className="grid grid-cols-2 gap-3">
      <Link
        to={PATH.RESUME_UPLOAD}
        className="border-2 border-dashed border-[#1E2A47]/40 rounded-xl py-4 flex items-center justify-center gap-2 text-[#1E2A47] text-sm font-semibold hover:bg-[#1E2A47]/5 transition-colors"
      >
        <IconUpload />
        이력서 제출
      </Link>
      <UploadSlot
        type="cover_letter"
        label="자소서 제출"
        onUpload={upload}
        disabled={isPending}
      />
    </div>
  );
}

function UploadSlot({ type, label, onUpload, disabled }) {
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) onUpload({ file, type });
    e.target.value = "";
  };

  return (
    <>
      <button
        type="button"
        onClick={() => fileInputRef.current.click()}
        disabled={disabled}
        className="border-2 border-dashed border-[#1E2A47]/40 rounded-xl py-4 flex items-center justify-center gap-2 text-[#1E2A47] text-sm font-semibold hover:bg-[#1E2A47]/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <IconUpload />
        {label}
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,.jpg,.png"
        hidden
        onChange={handleFileSelect}
      />
    </>
  );
}
