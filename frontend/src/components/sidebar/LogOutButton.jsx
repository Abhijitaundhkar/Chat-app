import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogOut";

export default function LogoutButton() {
  const { loading, logOut } = useLogout();

  return (
    <div className="mt-auto">
      {!loading ?(
      <BiLogOut
        className="w-6 h-6 text-white cursor-pointer"
        onClick={logOut}
      />
      ):(<span className="loading loading-spinner"></span>)}
    </div>
  );
}
