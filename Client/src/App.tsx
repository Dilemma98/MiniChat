import StartPage from "./pages";
import "../src/assets/styles/App.css";
import { useEffect } from "react";
import { socket } from "./services/websocket";

function App() {

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected!", socket.id);
    });
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
