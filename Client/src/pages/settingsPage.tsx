import FetchSettings from "../components/settings/fetchSettings";

export default function SettingsPage(){
    return(
      <div style={{ display: "flex", flexDirection: "row", height: "80vh"}}>
        <FetchSettings/>
      </div>
    );
}