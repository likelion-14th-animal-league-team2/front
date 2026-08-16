import { Link } from "react-router-dom";
import { IconUpload } from "../common/icons";
import { PATH } from "../../routes/paths";

export default function DocumentUploadButton() {
  return (
    <Link
      to={PATH.RESUME_UPLOAD}
      className="w-full border-2 border-dashed border-[#1E2A47]/40 rounded-xl py-4 flex items-center justify-center gap-2 text-[#1E2A47] text-sm font-semibold hover:bg-[#1E2A47]/5 transition-colors"
    >
      <IconUpload />
      이력서·자소서 제출
    </Link>
  );
}
