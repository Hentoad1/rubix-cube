import React from "react";

import "./Settings.css"
import SettingsButton from "./SettingsButton";


function Settings() {

  let [closed, setClosed] = React.useState(true);

  return (
    <div className = {closed ? 'SettingsMenu closed' : 'SettingsMenu open'}>
      <SettingsButton onClick={setClosed}/>
      <div className = 'SettingsMenuContent'>
        Settings
      </div>
    </div>
  );
}

export default Settings;
