import { useState } from "react";
import "../../assets/styles/settingspage.css";
import { LIVE_URL } from "../../url";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";

export default function FetchSettings() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const chosen = e.target.files?.[0];
    if (!chosen) return;
    setFile(chosen);
    setPreview(URL.createObjectURL(chosen));
  }

  async function handleUpload() {
    if (!file || !user.id) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("profilePic", file);
      formData.append("userId", user.id);

      const response = await fetch(`${LIVE_URL}/api/uploadProfilePic`, {
        method: "POST",
        body: formData,
      });

      const res = await response.json();
      console.log("Upload response", res);
    } catch {
      console.error("Uppladdningen misslyckades");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="settingsPage">

      <div className="avatar-wrap">
        <div className="avatar-circle">
          {!user?.profilePic && (
            <AccountCircleIcon />
          )}
          {preview ? (
            <img src={preview} alt="Profilbild" />
          ) : (
            <img src={user?.profilePic} />
          )}
        </div>
        <label className="avatar-edit" htmlFor="fileInput" title="Byt profilbild">
          <EditIcon style={{ fontSize: 13, color: "#fff" }} />
        </label>
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      <h2 className="userNameSettings">{user.name}</h2>

      <div className="settings-section">
        <p className="settings-section-label">Kontoinformation</p>
        <div className="settings-info-row">
          <span>Namn</span>
          <span>{user.name}</span>
        </div>
        <div className="settings-info-row" style={{ borderBottom: "none" }}>
          <span>ID</span>
          <span>#{user.id}</span>
        </div>
      </div>

      <button
        className="settings-save-btn"
        onClick={handleUpload}
        disabled={!file || loading}
      >
        {loading ? "Laddar upp..." : "Spara profilbild"}
      </button>

    </div>
  );
}