import { Link } from "react-router-dom";
import { PATH } from "../../routes/paths";
import { IconLogo } from "../common/icons";

function Header() {
  return (
    <header className="flex items-center gap-2 px-6 py-4 border-b border-slate-100">
      <Link to={PATH.MAIN} className="flex items-center gap-2">
        <IconLogo />
        <span className="font-semibold text-slate-900">레주밍</span>
      </Link>
    </header>
  );
}

export default Header;
