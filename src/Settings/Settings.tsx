import React from "react";

import "./Settings.css"
import SettingsButton from "./SettingsOpenButton";
import Slider from "./SettingsMenuSlider";
import Checkbox from "./SettingsCheckbox"
import Button from "./SettingsButton"
import Controls from "./SettingsControlListing"
import {RubixProps} from "../Cube/cube";
import {CameraProps} from "../Camera";


export interface Keybind {
  code: string,
  key: string
}

export interface SettingsConfig {
  cameraProps: CameraProps,
  rubixProps: RubixProps
}

interface SettingsButtonFunctions {
  Scramble_Cube: () => void,
  Reset_Cube:() => void,
  Reset_Settings:() => void,
}

interface SettingsProps {
  Settings: SettingsConfig,
  UpdateSettings: React.Dispatch<React.SetStateAction<SettingsConfig>>
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
          caption = 'Rotation Time'
          unit = 's'
          min = {0}
          max = {2}
          step = {0.1}
          default_value = {props.Settings.cameraProps.CAM_ROTATION_TIME_S}
          onInput = {(v: number) => props.UpdateSettings((s: SettingsConfig) => ({...s, cameraProps:{...s.cameraProps, CAM_ROTATION_TIME_S: v}}))}
        />
        <Slider 
          caption = 'Distance From Origin'
          min = {2.5}
          max = {10}
          step = {0.5}
          default_value = {props.Settings.cameraProps.CAM_DISTANCE_FROM_CENTER}
          onInput = {(v: number) => props.UpdateSettings((s: SettingsConfig) => ({...s, cameraProps:{...s.cameraProps, CAM_DISTANCE_FROM_CENTER: v}}))}
        />

        <Checkbox
          caption = 'Camera has Diagonal Offset'
          default_value = {props.Settings.cameraProps.CAM_IS_OFFSET}
          onInput = {(v: boolean) => props.UpdateSettings((s: SettingsConfig) => ({...s, cameraProps:{...s.cameraProps, CAM_IS_OFFSET: v}}))}
        />
        <Checkbox
          caption = 'Camera waits for Rotation before Rotating again'
          default_value = {props.Settings.cameraProps.CAM_WAIT_FOR_ROTATE}
          onInput = {(v: boolean) => props.UpdateSettings((s: SettingsConfig) => ({...s, cameraProps:{...s.cameraProps, CAM_WAIT_FOR_ROTATE: v}}))}
        />

        <Controls 
          caption = "Rotate Camera Left"
          value = {props.Settings.cameraProps.Keybinds.CAMERA_ROTATE_LEFT.key}
          UpdateKey = {(s: Keybind) => {
            props.UpdateSettings((currentSettings : SettingsConfig) => ({
              ...currentSettings,
              cameraProps:{
                ...currentSettings.cameraProps,
                Keybinds:{
                  ...currentSettings.cameraProps.Keybinds,
                  CAMERA_ROTATE_LEFT: s
                }
              }
            }));
          }}
        />

        <Controls 
          caption = "Rotate Camera Right"
          value = {props.Settings.cameraProps.Keybinds.CAMERA_ROTATE_RIGHT.key}
          UpdateKey = {(s: Keybind) => {
            props.UpdateSettings((currentSettings : SettingsConfig) => ({
              ...currentSettings,
              cameraProps:{
                ...currentSettings.cameraProps,
                Keybinds:{
                  ...currentSettings.cameraProps.Keybinds,
                  CAMERA_ROTATE_RIGHT: s
                }
              }
            }));
          }}
        />

        <Controls 
          caption = "Rotate Camera Up"
          value = {props.Settings.cameraProps.Keybinds.CAMERA_ROTATE_UP.key}
          UpdateKey = {(s: Keybind) => {
            props.UpdateSettings((currentSettings : SettingsConfig) => ({
              ...currentSettings,
              cameraProps:{
                ...currentSettings.cameraProps,
                Keybinds:{
                  ...currentSettings.cameraProps.Keybinds,
                  CAMERA_ROTATE_UP: s
                }
              }
            }));
          }}
        />

        <Controls 
          caption = "Rotate Camera Down"
          value = {props.Settings.cameraProps.Keybinds.CAMERA_ROTATE_DOWN.key}
          UpdateKey = {(s: Keybind) => {
            props.UpdateSettings((currentSettings : SettingsConfig) => ({
              ...currentSettings,
              cameraProps:{
                ...currentSettings.cameraProps,
                Keybinds:{
                  ...currentSettings.cameraProps.Keybinds,
                  CAMERA_ROTATE_DOWN: s
                }
              }
            }));
          }}
        />

        <label className = 'SettingsMenuSubheader'>
          Rubix Cube
        </label>

        <Slider 
          caption = 'Rubix Rotation Time'
          unit = 's'
          min = {0}
          max = {1}
          step = {0.05}
          default_value = {props.Settings.rubixProps.Config.PART_ROTATION_TIME_S}
          onInput = {(v: number) => props.UpdateSettings((s: SettingsConfig) => ({...s, rubixProps:{...s.rubixProps, Config: {...s.rubixProps.Config, PART_ROTATION_TIME_S: v}}}))}
        />
        <Slider 
          caption = 'Rubix Piece Seperation'
          min = {0}
          max = {0.05}
          step = {0.005}
          default_value = {props.Settings.rubixProps.Config.PART_SEPERATION_AMOUNT}
          onInput = {(v: number) => props.UpdateSettings((s: SettingsConfig) => ({...s, rubixProps:{...s.rubixProps, Config: {...s.rubixProps.Config, PART_SEPERATION_AMOUNT: v}}}))}
        />

        <Checkbox
          caption = 'Use shift to reverse rotations'
          default_value = {props.Settings.rubixProps.Keybinds.ShiftToInvert}
          onInput = {(v: boolean) => props.UpdateSettings((s: SettingsConfig) => ({...s, rubixProps:{...s.rubixProps, Keybinds: {...s.rubixProps.Keybinds, ShiftToInvert: v}}}))}
        />
        

        <Controls 
          caption = {"Rotate Cube Top" + (props.Settings.rubixProps.Keybinds.ShiftToInvert ? "" : " Clockwise")}
          value = {props.Settings.rubixProps.Keybinds.ROTATE_TOP_C.key}
          UpdateKey = {(s: Keybind) => {
            props.UpdateSettings((currentSettings : SettingsConfig) => ({
              ...currentSettings,
              rubixProps:{
                ...currentSettings.rubixProps,
                Keybinds:{
                  ...currentSettings.rubixProps.Keybinds,
                  ROTATE_TOP_C: s
                }
              }
            }));
          }}
        />

        <Controls 
          caption = {"Rotate Cube Bottom" + (props.Settings.rubixProps.Keybinds.ShiftToInvert ? "" : " Clockwise")}
          value = {props.Settings.rubixProps.Keybinds.ROTATE_BOTTOM_C.key}
          UpdateKey = {(s: Keybind) => {
            props.UpdateSettings((currentSettings : SettingsConfig) => ({
              ...currentSettings,
              rubixProps:{
                ...currentSettings.rubixProps,
                Keybinds:{
                  ...currentSettings.rubixProps.Keybinds,
                  ROTATE_BOTTOM_C: s
                }
              }
            }));
          }}
        />

        <Controls 
          caption = {"Rotate Cube Left" + (props.Settings.rubixProps.Keybinds.ShiftToInvert ? "" : " Clockwise")}
          value = {props.Settings.rubixProps.Keybinds.ROTATE_LEFT_C.key}
          UpdateKey = {(s: Keybind) => {
            props.UpdateSettings((currentSettings : SettingsConfig) => ({
              ...currentSettings,
              rubixProps:{
                ...currentSettings.rubixProps,
                Keybinds:{
                  ...currentSettings.rubixProps.Keybinds,
                  ROTATE_LEFT_C: s
                }
              }
            }));
          }}
        />

        <Controls 
          caption = {"Rotate Cube Right" + (props.Settings.rubixProps.Keybinds.ShiftToInvert ? "" : " Clockwise")}
          value = {props.Settings.rubixProps.Keybinds.ROTATE_RIGHT_C.key}
          UpdateKey = {(s: Keybind) => {
            props.UpdateSettings((currentSettings : SettingsConfig) => ({
              ...currentSettings,
              rubixProps:{
                ...currentSettings.rubixProps,
                Keybinds:{
                  ...currentSettings.rubixProps.Keybinds,
                  ROTATE_RIGHT_C: s
                }
              }
            }));
          }}
        />

        <Controls 
          caption = {"Rotate Cube Front" + (props.Settings.rubixProps.Keybinds.ShiftToInvert ? "" : " Clockwise")}
          value = {props.Settings.rubixProps.Keybinds.ROTATE_FRONT_C.key}
          UpdateKey = {(s: Keybind) => {
            props.UpdateSettings((currentSettings : SettingsConfig) => ({
              ...currentSettings,
              rubixProps:{
                ...currentSettings.rubixProps,
                Keybinds:{
                  ...currentSettings.rubixProps.Keybinds,
                  ROTATE_FRONT_C: s
                }
              }
            }));
          }}
        />

        <Controls 
          caption = {"Rotate Cube Back" + (props.Settings.rubixProps.Keybinds.ShiftToInvert ? "" : " Clockwise")}
          value = {props.Settings.rubixProps.Keybinds.ROTATE_BACK_C.key}
          UpdateKey = {(s: Keybind) => {
            props.UpdateSettings((currentSettings : SettingsConfig) => ({
              ...currentSettings,
              rubixProps:{
                ...currentSettings.rubixProps,
                Keybinds:{
                  ...currentSettings.rubixProps.Keybinds,
                  ROTATE_BACK_C: s
                }
              }
            }));
          }}
        />

        
        {
          props.Settings.rubixProps.Keybinds.ShiftToInvert ? <React.Fragment/> : (
            
            <React.Fragment>

              <Controls 
                caption = "Rotate Cube Top Counterclockwise"
                value = {props.Settings.rubixProps.Keybinds.ROTATE_TOP_CC.key}
                UpdateKey = {(s: Keybind) => {
                  props.UpdateSettings((currentSettings : SettingsConfig) => ({
                    ...currentSettings,
                    rubixProps:{
                      ...currentSettings.rubixProps,
                      Keybinds:{
                        ...currentSettings.rubixProps.Keybinds,
                        ROTATE_TOP_CC: s
                      }
                    }
                  }));
                }}
              />

              <Controls 
                caption = "Rotate Cube Bottom Counterclockwise"
                value = {props.Settings.rubixProps.Keybinds.ROTATE_BOTTOM_CC.key}
                UpdateKey = {(s: Keybind) => {
                  props.UpdateSettings((currentSettings : SettingsConfig) => ({
                    ...currentSettings,
                    rubixProps:{
                      ...currentSettings.rubixProps,
                      Keybinds:{
                        ...currentSettings.rubixProps.Keybinds,
                        ROTATE_BOTTOM_CC: s
                      }
                    }
                  }));
                }}
              />

              

              <Controls 
                caption = "Rotate Cube Left Counterclockwise"
                value = {props.Settings.rubixProps.Keybinds.ROTATE_LEFT_CC.key}
                UpdateKey = {(s: Keybind) => {
                  props.UpdateSettings((currentSettings : SettingsConfig) => ({
                    ...currentSettings,
                    rubixProps:{
                      ...currentSettings.rubixProps,
                      Keybinds:{
                        ...currentSettings.rubixProps.Keybinds,
                        ROTATE_LEFT_CC: s
                      }
                    }
                  }));
                }}
              />

              <Controls 
                caption = "Rotate Cube Right Counterclockwise"
                value = {props.Settings.rubixProps.Keybinds.ROTATE_RIGHT_CC.key}
                UpdateKey = {(s: Keybind) => {
                  props.UpdateSettings((currentSettings : SettingsConfig) => ({
                    ...currentSettings,
                    rubixProps:{
                      ...currentSettings.rubixProps,
                      Keybinds:{
                        ...currentSettings.rubixProps.Keybinds,
                        ROTATE_RIGHT_CC: s
                      }
                    }
                  }));
                }}
              />

              <Controls 
                caption = "Rotate Cube Front Counterclockwise"
                value = {props.Settings.rubixProps.Keybinds.ROTATE_FRONT_CC.key}
                UpdateKey = {(s: Keybind) => {
                  props.UpdateSettings((currentSettings : SettingsConfig) => ({
                    ...currentSettings,
                    rubixProps:{
                      ...currentSettings.rubixProps,
                      Keybinds:{
                        ...currentSettings.rubixProps.Keybinds,
                        ROTATE_FRONT_CC: s
                      }
                    }
                  }));
                }}
              />

              <Controls 
                caption = "Rotate Cube Back Counterclockwise"
                value = {props.Settings.rubixProps.Keybinds.ROTATE_BACK_CC.key}
                UpdateKey = {(s: Keybind) => {
                  props.UpdateSettings((currentSettings : SettingsConfig) => ({
                    ...currentSettings,
                    rubixProps:{
                      ...currentSettings.rubixProps,
                      Keybinds:{
                        ...currentSettings.rubixProps.Keybinds,
                        ROTATE_BACK_CC: s
                      }
                    }
                  }));
                }}
              />

            </React.Fragment>
          )
        }

        <label className = 'SettingsMenuSubheader'>
        </label>

        <div className = "SettingsRow">
          <Button
            text = 'Reset Cube'
            onClick = {props.ButtonFunctions.Reset_Cube}
          />
          <Button
            text = 'Scramble Cube'
            onClick = {props.ButtonFunctions.Scramble_Cube}
          />
        </div>

        <Button
          text = 'Reset Settings'
          onClick = {props.ButtonFunctions.Reset_Settings}
        />


      </div>
    </div>
  );
}

export default Settings;
