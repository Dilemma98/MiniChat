import type { ModalProps } from "../../props/modalProps";
import { useState } from "react";
import "../../assets/styles/authModal.css";
import {
  LIVE_URL,
  // LOCAL_URL
} from "../../url";
import LoadingComponent from "../loadingComponent";

export default function AuthModal({ modalType, onClose, onLogin }: ModalProps) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  //   const [user, setUser] = useState(false);

  async function handleDemoLogin() {
    setEmail("demo@mail.se");
    setPassword("Test123");
    try {
      setLoading(true);
      const response = await fetch(`${LIVE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "demo@mail.se",
          password: "Test123",
        }),
      });
      const res = await response.json();
      localStorage.setItem("token", res.token);
      if (res.user) {
        localStorage.setItem("user", JSON.stringify(res.user));
        onLogin(res.user);
      }
      onClose();
    } catch {
      console.error("Kunde inte logga in som demo");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin() {
    try {
      setLoading(true);
      const body = {
        email,
        password,
      };
      const response = await fetch(`${LIVE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const res = await response.json();
      // console.log("response", res.token);
      localStorage.setItem("token", res.token);
      if (res.user) {
        localStorage.setItem("user", JSON.stringify(res.user));
        console.log("USER", res.user);
        onLogin(res.user);
      }
      onClose();
    } catch {
      console.error("Kunde inte logga in");
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister() {
    try {
      setLoading(false);
      const body = {
        fname,
        lname,
        email,
        password,
      };
      const response = await fetch(`${LIVE_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const res = await response.json();
      console.log("response", res);
      localStorage.setItem("token", res.token);
      if (res.user) {
        localStorage.setItem("user", JSON.stringify(res.user));
        onLogin(res.user);
      }
      onClose();
    } catch {
      console.error("Kunde inte logga in");
    } finally {
      setLoading(false);
    }
  }

  async function handleKeyDown(e: React.KeyboardEvent, action: () => void) {
    if (e.key === "Enter") {
      action();
    }
  }
  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
          {loading && <LoadingComponent />}
          {modalType === "login" ? (
            <>
              <h2 className="modal-title">Logga in</h2>
              <input
                className="modal-input"
                autoFocus
                type="text"
                placeholder="E-post"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="modal-input"
                type="password"
                placeholder="Lösenord"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, handleLogin)}
              />
              <button className="modal-submit" onClick={handleLogin}>
                Logga in
              </button>
              <button className="modal-demo" onClick={handleDemoLogin}>
                Prova demo
              </button>
            </>
          ) : (
            <>
              <h2 className="modal-title">Skapa konto</h2>
              <div className="modal-name-row">
                <input
                  className="modal-input"
                  type="text"
                  autoFocus
                  placeholder="Förnamn"
                  onChange={(e) => setFname(e.target.value)}
                />
                <input
                  className="modal-input"
                  type="text"
                  placeholder="Efternamn"
                  onChange={(e) => setLname(e.target.value)}
                />
              </div>
              <input
                className="modal-input"
                type="text"
                placeholder="E-post"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="modal-input"
                type="password"
                placeholder="Lösenord"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, handleRegister)}
              />
              <button className="modal-submit" onClick={handleRegister}>
                Skapa konto
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
