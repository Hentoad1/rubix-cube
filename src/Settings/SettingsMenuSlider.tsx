import React from "react";

import "./SettingsMenuSlider.css"


interface RangeProps{
  min: number,
  max: number,
}

function RangeInput(props: RangeProps){

  return (
    <input type = 'range' className = "SettingsSliderRange"/>
  )
}

interface TextProps{
  unit: string
}

function TextInput(props: TextProps){
  return (
    <span className = "SettingsSliderTextWrapper">
      <input type = 'text' className = "SettingsSliderText" placeholder = '15'/>
      <span className = "SettingsSliderTextUnit">
        {props.unit}
      </span>
    </span>
  )
}

interface SettingsMenuSliderProps{
  //slider props
  Caption: string
  //range props
  
  //text input props
}

function SettingsMenuSlider() {
  
  return (
    <div className = "SettingsSlider">
      <span className = "SettingsSliderCaption">
        Caption
      </span>
      <RangeInput min = {10} max = {20}/>
      <TextInput unit = "s"/>
    </div>
  );
}

export default SettingsMenuSlider;
