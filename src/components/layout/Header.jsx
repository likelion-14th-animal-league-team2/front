import { Link } from "react-router-dom";
import { PATH } from "../../routes/paths";
import { IconLogo, IconUser } from "../common/icons";

function Header() {
  return (
    <header className="flex items-center justify-between gap-2 px-6 py-4 border-b border-slate-100">
      <Link to={PATH.MAIN} className="flex items-center gap-2">
        <IconLogo />
        <span className="font-semibold text-slate-900">레주밍</span>
      </Link>
      <Link
        to={PATH.MYPAGE}
        aria-label="마이페이지"
        className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-[#1E2A47] hover:bg-slate-200 transition-colors"
      >
        <IconUser width="16" height="18.29" />
      </Link>
    </header>
  );
}

export default Header;
