import { Link } from "react-router-dom";
import { IconUpload } from "../common/icons";
import { PATH } from "../../routes/paths";

export default function DocumentUploadButton() {
  return (
    <Link
      to={PATH.RESUME_UPLOAD}
      className="w-full rounded-xl py-4 flex items-center justify-center gap-2 text-white text-sm font-semibold transition-colors bg-[#173B6B] hover:bg-[#12305A]"
    >
      <IconUpload />
      이력서·자소서 제출
    </Link>
  );
}
