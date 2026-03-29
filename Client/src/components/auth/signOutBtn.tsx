import LogoutIcon from "@mui/icons-material/Logout";
import type { SignedInProp } from "../../props/signedInProp";

export default function SignOutBtn({onLogout}: SignedInProp) {
    function handleLogOut(){
        console.log("KLICK");
        localStorage.removeItem("user");
        localStorage.removeItem("token")
        onLogout?.();
    }
  return (
    <div>
      <button
        style={{
          backgroundColor: "#dfc2d4",
          border: "none",
          padding: "0.5em",
          borderRadius: "1em",
        }}
        onClick={handleLogOut}
      >
        <LogoutIcon fontSize="small" />
      </button>
    </div>
  );
}
