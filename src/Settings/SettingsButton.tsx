import React, { ComponentProps } from "react";

import "./SettingsButton.css"
import { ReactComponent as LeftArrow } from "../Assets/LeftArrow.svg"
import { ReactComponent as RightArrow } from "../Assets/RightArrow.svg"

interface SettingsButtonProps{
  onClick: Function
}

function SettingsButton(props: SettingsButtonProps) {

  let [closed, isClosed] = React.useState(true);


  function onClick(){
    let state = !closed;
    props.onClick(state);
    isClosed(state);
  }
  
  return (
    <button onClick = {onClick}className = 'SettingsOpenButton'>
      {closed ? <LeftArrow/> : <RightArrow/>}
    </button>
  );
}

export default SettingsButton;
