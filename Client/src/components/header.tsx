import "../assets/styles/header.css";
import type { SignedInProp } from "../props/signedInProp";
import SignOutBtn from "./auth/signOutBtn";
import LoginIcon from '@mui/icons-material/Login';
// import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

export default function Header({ user, onOpenModal, onLogout }: SignedInProp) {
  // const [modalType, setModalType] = useState<"login" | "register" | null>(null);

  return (
    <header className="header">
      <div className="header-content">
        <div className="left">
          <div className="text">
            <h1 className="title">MiniChat</h1>
          </div>
        </div>
        {!user ? (
          <div className="right">
            <button
              className="btn primary"
              onClick={() => {
                onOpenModal?.("login");
              }}
            >
              <LoginIcon fontSize="small" />
            </button>
            {/* <button
              className="btn secondary"
              onClick={() => {
                onOpenModal?.("register");
              }}
            >
             <PersonAddAltIcon fontSize="small" />
            </button> */}
          </div>
        ):(
          <SignOutBtn onLogout={onLogout} />
        )}
      </div>
    </header>
  );
}
