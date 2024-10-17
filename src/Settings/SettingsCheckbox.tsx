import React from "react";

import "./SettingsCheckbox.css"

export interface SettingsCheckboxProps{
  caption: string,
  default_value: boolean,
  onInput: (b: boolean) => void
}

export interface InnerCheckboxProps{
  value: boolean,
  onInputStart: (b: boolean) => void
  onInputEnd: (b: boolean) => void
}

function InnerCheckbox(props: InnerCheckboxProps){
  
  function onChange(e: React.ChangeEvent<HTMLInputElement>){
    props.onInputStart(e.target.checked);
    props.onInputEnd(e.target.checked);
  }

  return(
    <input type = "checkbox" className = "SettingsCheckboxInput" checked = {props.value} onChange = {onChange}/> 
  )
}

function SettingsCheckboxProps(props: SettingsCheckboxProps) {
  
  const [value, useValue] = React.useState(props.default_value);

  return (
    <div className = "SettingsCheckbox">
        <label className = "SettingsCheckboxCaption">
          {props.caption}
        </label>
        <InnerCheckbox value = {value} onInputStart = {useValue} onInputEnd = {props.onInput}/>
      </div>
  );
}

export default SettingsCheckboxProps;
