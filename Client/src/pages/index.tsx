import { useState, useEffect } from "react";
import Header from "../components/header";
import SignedIn from "./signedInPage";
import AuthModal from "../components/auth/authModal";

export default function StartPage() {
  const [ user, setUser ] = useState(null);
  const [modalType, setModalType] = useState<"login" | "register" | null>(null);
  useEffect(() => {});
  return (
    <div>
        <Header 
        user={user}
        onOpenModal={(type) => setModalType(type)}
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
