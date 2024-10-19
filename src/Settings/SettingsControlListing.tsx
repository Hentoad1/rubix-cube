import React, { ComponentProps } from "react";

import "./SettingsControlListing.css"
import { ReactComponent as LeftArrow } from "../Assets/LeftArrow.svg"
import { ReactComponent as RightArrow } from "../Assets/RightArrow.svg"

interface ControlListingProps{
  caption: string
}

function ControlListing(props: ControlListingProps) {

  let [keyname, setKeyname] = React.useState();

  return (
    <button className = "SettingsControlListing">
      <label className = "SettingsControlListingCaption">
        {props.caption}
      </label>
      <span className = "SettingsControlListingKey">
        example
      </span>
    </button>
  )
}

export default ControlListing;
