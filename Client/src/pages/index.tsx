import { useState, useEffect } from "react";
import Header from "../components/header";
import SignedIn from "./signedInPage";
import AuthModal from "../components/auth/authModal";

export default function StartPage() {
  const [ user, setUser ] = useState(null);
  const [modalType, setModalType] = useState<"login" | "register" | null>(null);
  
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if(savedUser){
      setUser(JSON.parse(savedUser));
    }
  },[]);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "95%", margin: "0 auto", height: "100vh" }}>
        <Header 
        user={user}
        onOpenModal={(type) => setModalType(type)}
        onLogout={() => setUser(null)}
        />
        { user && (
          <SignedIn user={user}/>
        )}
        {modalType && (
          <AuthModal 
            modalType={modalType}  
            onClose={() => setModalType(null)} 
            onLogin={(user) => setUser(user)} 
          />
        )}
    </div>
  );
}
