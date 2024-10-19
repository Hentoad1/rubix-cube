import React from "react";

import "./SettingsButton.css"

export interface SettingsButtonProps {
  text: string,
  onClick: Function
}
function SettingsButton(props: SettingsButtonProps) {

  return (
    <button className = "SettingsButton" onClick = {() => props.onClick()}>
      {props.text}
    </button>
  );
}

export default SettingsButton;
