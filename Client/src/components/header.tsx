import "../assets/styles/header.css";
import type { SignedInProp } from "../props/signedInProp";

export default function Header({ user, onOpenModal }: SignedInProp) {
  // const [modalType, setModalType] = useState<"login" | "register" | null>(null);

  return (
    <header className="header">
      <div className="header-content">
        <div className="left">
          <div className="text">
            <h1 className="title">MiniChat</h1>
          </div>
        </div>
        {!user && (
          <div className="right">
            <button
              className="btn primary"
              onClick={() => {
                onOpenModal?.("login");
              }}
            >
              Logga in
            </button>
            <button
              className="btn secondary"
              onClick={() => {
                onOpenModal?.("register");
              }}
            >
              Registrera
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
