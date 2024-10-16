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
        <Slider caption = 'caption' unit = 's' min = {2} max = {10} default_value = {7} onInput = {(e: number) => {console.log(e)}}/>
      </div>
    </div>
  );
}

export default Settings;
