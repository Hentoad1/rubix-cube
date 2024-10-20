import React, { ComponentProps } from "react";

import "./SettingsControlListing.css"
import { ReactComponent as LeftArrow } from "../Assets/LeftArrow.svg"
import { ReactComponent as RightArrow } from "../Assets/RightArrow.svg"
import { Keybind } from "./Settings";

interface ControlListingProps{
  caption: string,
  value: string,
  UpdateKey: (arg0: Keybind) => void
}

function ControlListing(props: ControlListingProps) {

  let [awaiting, setAwaiting] = React.useState<boolean>(false);


  const onButtonClick = React.useCallback(() => {
    if (!awaiting){
      setAwaiting(true);

      new Promise<Keybind>((resolve, reject) => {
        
        const rebindKey = (e: KeyboardEvent) => {
          window.removeEventListener('keydown', rebindKey);
          if (e.key == "Escape"){
            resolve({
              code:"None",
              key:"[Unbound]"
            });
          }else{
            resolve({
              code:e.code,
              key:e.key
            });
          }
        }

        window.addEventListener('keydown', rebindKey);

      }).then((key: Keybind) => {
        setAwaiting(false)
        props.UpdateKey(key);
      });
    }
  }, []);

  if (awaiting){
    return (
      <button className = "SettingsControlListing" onClick = {onButtonClick}>
        <span className = "SettingsControlListingNotifcation" >
          Press any key to rebind
        </span>
      </button>
    )
  }else{
    return (
      <button className = "SettingsControlListing" onClick = {onButtonClick}>
        <label className = "SettingsControlListingCaption">
          {props.caption}
        </label>
        <span className = "SettingsControlListingKey">
          {props.value}
        </span>
      </button>
    )
  }
}

export default ControlListing;
