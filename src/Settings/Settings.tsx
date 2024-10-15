import React from "react";

import "./Settings.css"
import SettingsButton from "./SettingsButton";
import Slider from "./SettingsMenuSlider";


function Settings() {

  let [closed, setClosed] = React.useState(true);

  return (
    <div className = {closed ? 'SettingsMenu closed' : 'SettingsMenu open'}>
      <SettingsButton onClick={setClosed}/>
      <div className = 'SettingsMenuContent'>
        <div className = 'SettingsMenuSubheader'>
          Camera
        </div>
        <Slider/>
      </div>
    </div>
  );
}

export default Settings;
