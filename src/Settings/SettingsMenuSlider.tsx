import React, { ChangeEvent } from "react";

import "./SettingsMenuSlider.css"


interface RangeProps{
  min: number,
  max: number,
  value: number,
  onInputStart: (n: number) => void
  onInputEnd: (n: number) => void
}

function RangeInput(props: RangeProps){

  const setValue = React.useCallback((n: number) => {
    props.onInputStart(n);
    props.onInputEnd(n);
  }, [props.onInputStart, props.onInputEnd]);

  const onInput = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.valueAsNumber);
  }, [setValue]);

  return (
    <input type = 'range' className = "SettingsSliderRange" min = {props.min} max = {props.max} value = {props.value} onChange = {onInput}/>
  )
}

interface TextProps{
  unit?: string,
  max_digits?: number
  min: number,
  max: number,
  value: number,
  onInputStart: (n: number) => void
  onInputEnd: (n: number) => void
}

function TextInput(props: TextProps){

  const setValue = React.useCallback((n: number) => {
    props.onInputStart(n);
    props.onInputEnd(n);
  }, [props.onInputStart, props.onInputEnd]);

  const onInput = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.key == "Enter"){
      let newValue = parseInt(e.currentTarget.value);

      if (newValue > props.max){
        newValue = props.max;
      }else if (newValue < props.min){
        newValue = props.min;
      }

      setValue(newValue);
      e.currentTarget.value = "";
    }
    
  }, [setValue, props.max, props.min])
  
  const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();


    let matched = e.target.value.match(new RegExp(/[0-9]*/g))?.join("");
    e.target.value = matched ? matched : "";
  }, [])

  return (
    <span className = "SettingsSliderTextWrapper">
      <input type = "text" className = "SettingsSliderText" placeholder = {props.value + ""} onChange = {onChange} onKeyUp = {onInput}/>
      <span className = "SettingsSliderTextUnit">
        {props.unit ? props.unit : ""}
      </span>
    </span>
  )
}

export interface SettingsMenuSliderProps{
  caption: string,
  unit?: string,
  min: number,
  max: number,
  default_value: number,
  onInput?: any
}

function SettingsMenuSlider(props: SettingsMenuSliderProps) {
  
  const [value, useValue] = React.useState(props.default_value);

  return (
    <div className = "SettingsSlider">
        <label className = "SettingsSliderCaption">
          Caption
        </label>
        <RangeInput {...props} value = {value} onInputStart = {useValue} onInputEnd = {props.onInput}/>
        <TextInput {...props} value = {value} onInputStart = {useValue} onInputEnd = {props.onInput}/>
      </div>
  );
}

export default SettingsMenuSlider;
