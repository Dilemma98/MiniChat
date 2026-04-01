import StartPage from "./pages";
import "../src/assets/styles/App.css";
import { useEffect } from "react";
import { socket } from "./services/websocket";
// import { useNotification } from "./context/notificationContext";

function App() {


useEffect(() => {
  const handleConnect = () => {
    console.log("connected!", socket.id);
  };

  socket.on("connect", handleConnect);

  return () => {
    socket.off("connect", handleConnect);
  };
}, []);



  return (
    <div className="app">
      <div className="background">
        <div style={{ position: "relative", zIndex: 1 }}>
          <StartPage />
        </div>
      </div>
    </div>
  );
}

export default App;
