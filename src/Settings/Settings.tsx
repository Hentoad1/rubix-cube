import React from "react";

import "./Settings.css"
import SettingsButton from "./SettingsOpenButton";
import Slider from "./SettingsMenuSlider";
import Checkbox from "./SettingsCheckbox"
import Button from "./SettingsButton"
import Controls from "./SettingsControlListing"
import {RubixProps} from "../Cube/cube";
import {CameraProps} from "../Camera";

export interface SettingsConfig {
  cameraProps: CameraProps,
  rubixProps: RubixProps,
}

interface SettingsButtonFunctions {
  Scramble: () => void,
  Reset:() => void
}

interface SettingsProps {
  Settings: SettingsConfig,
  UpdateSettings: (v : SettingsConfig) => void
  ButtonFunctions: SettingsButtonFunctions
}

function Settings(props: SettingsProps) {

  let [closed, setClosed] = React.useState(true);

  return (
    <div className = {closed ? 'SettingsMenu closed' : 'SettingsMenu open'}>
      <SettingsButton onClick={setClosed}/>
      <div className = 'SettingsMenuContent'>

        <label className = 'SettingsMenuSubheader'>
          Camera
        </label>

        <Slider 
          caption = 'CAM_ROTATION_TIME_S'
          unit = 's'
          min = {0}
          max = {2}
          step = {0.1}
          default_value = {props.Settings.cameraProps.CAM_ROTATION_TIME_S}
          onInput = {(v: number) => props.UpdateSettings({...props.Settings, cameraProps:{...props.Settings.cameraProps, CAM_ROTATION_TIME_S: v}})}
        />
        <Slider 
          caption = 'CAM_DISTANCE_FROM_CENTER'
          min = {2.5}
          max = {10}
          step = {0.5}
          default_value = {props.Settings.cameraProps.CAM_DISTANCE_FROM_CENTER}
          onInput = {(v: number) => props.UpdateSettings({...props.Settings, cameraProps:{...props.Settings.cameraProps, CAM_DISTANCE_FROM_CENTER: v}})}
        />
        <div className = "SettingsRow">
          <Checkbox
            caption = 'CAM_IS_OFFSET'
            default_value = {props.Settings.cameraProps.CAM_IS_OFFSET}
            onInput = {(v: boolean) => props.UpdateSettings({...props.Settings, cameraProps:{...props.Settings.cameraProps, CAM_IS_OFFSET: v}})}
          />
          <Checkbox
            caption = 'CAM_WAIT_FOR_ROTATE'
            default_value = {props.Settings.cameraProps.CAM_WAIT_FOR_ROTATE}
            onInput = {(v: boolean) => props.UpdateSettings({...props.Settings, cameraProps:{...props.Settings.cameraProps, CAM_WAIT_FOR_ROTATE: v}})}
          />
        </div>

        <label className = 'SettingsMenuSubheader'>
          Rubix Cube
        </label>

        <Slider 
          caption = 'PART_ROTATION_TIME_S'
          unit = 's'
          min = {0}
          max = {1}
          step = {0.05}
          default_value = {props.Settings.rubixProps.Config.PART_ROTATION_TIME_S}
          onInput = {(v: number) => props.UpdateSettings({...props.Settings, rubixProps:{...props.Settings.rubixProps, Config: {...props.Settings.rubixProps.Config, PART_ROTATION_TIME_S: v}}})}
        />
        <Slider 
          caption = 'PART_SEPERATION_AMOUNT'
          min = {0}
          max = {0.05}
          step = {0.005}
          default_value = {props.Settings.rubixProps.Config.PART_SEPERATION_AMOUNT}
          onInput = {(v: number) => props.UpdateSettings({...props.Settings, rubixProps:{...props.Settings.rubixProps, Config: {...props.Settings.rubixProps.Config, PART_SEPERATION_AMOUNT: v}}})}
        />


        <label className = 'SettingsMenuSubheader'>
          Controls
        </label>

        <Controls caption = "a"/>

        <label className = 'SettingsMenuSubheader'>
        </label>

        <div className = "SettingsRow">
          <Button
            text = 'Reset Cube'
            onClick = {props.ButtonFunctions.Reset}
          />
          <Button
            text = 'Scramble Cube'
            onClick = {props.ButtonFunctions.Scramble}
          />
        </div>



      </div>
    </div>
  );
}

export default Settings;
