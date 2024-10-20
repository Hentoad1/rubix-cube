import './App.css';
import { Canvas } from '@react-three/fiber'

import * as THREE from "three"
import React from "react";

import Rubix, {RubixHandle} from "./Cube/cube";
import Camera from "./Camera";
import Settings, {SettingsConfig} from './Settings/Settings';


const DEFAULT_PROPS : SettingsConfig = {
  cameraProps: {
    CAM_ROTATION_TIME_S: 1,
    CAM_DISTANCE_FROM_CENTER: 5,
    CAM_IS_OFFSET: true,
    CAM_WAIT_FOR_ROTATE: true,
    UpdateOrientation: undefined,
    Keybinds: {
      CAMERA_ROTATE_UP: {
        code: "ArrowUp",
        key: "ArrowUp"
      },
      CAMERA_ROTATE_DOWN: {
        code: "ArrowDown",
        key: "ArrowDown"
      },
      CAMERA_ROTATE_LEFT: {
        code: "ArrowLeft",
        key: "ArrowLeft"
      },
      CAMERA_ROTATE_RIGHT: {
        code: "ArrowRight",
        key: "ArrowRight"
      }
    }
  },
  rubixProps: {
    CameraOrientation: new THREE.Quaternion(),
    Config:{ 
      PART_SEPERATION_AMOUNT: 0.005,
      PART_ROTATION_TIME_S : 0.1
    },
    Keybinds:{    
      ShiftToInvert: true,
      ROTATE_TOP_C: {
        code: "KeyW",
        key: "w"
      },
      ROTATE_TOP_CC: {
        code: "KeyU",
        key: "u"
      },
      ROTATE_BOTTOM_C: {
        code: "KeyS",
        key: "s"
      },
      ROTATE_BOTTOM_CC: {
        code: "KeyJ",
        key: "j"
      },
      ROTATE_LEFT_C: {
        code: "KeyA",
        key: "a"
      },
      ROTATE_LEFT_CC: {
        code: "KeyH",
        key: "h"
      },
      ROTATE_RIGHT_C: {
        code: "KeyD",
        key: "d"
      },
      ROTATE_RIGHT_CC: {
        code: "KeyK",
        key: "k"
      },
      ROTATE_FRONT_C: {
        code: "KeyQ",
        key: "q"
      },
      ROTATE_FRONT_CC: {
        code: "KeyY",
        key: "y"
      },
      ROTATE_BACK_C: {
        code: "KeyE",
        key: "e"
      },
      ROTATE_BACK_CC:{
        code: "KeyI",
        key: "i"
      },
    }
  }
}

function App() {

  let [CamOrientation, setCamOrientation] = React.useState<THREE.Quaternion>(new THREE.Quaternion());

  let [SettingsConfig, setSettingsConfig] = React.useState<SettingsConfig>({...DEFAULT_PROPS});

  let cubeRef = React.useRef<RubixHandle>(null);

  let ScrambleCube = React.useCallback(() => {
    cubeRef?.current?.Scramble();
  }, []);

  let ResetCube = React.useCallback(() => {
    cubeRef?.current?.Reset();
  }, []);

  let ResetSettings = React.useCallback(() => {
    setSettingsConfig(DEFAULT_PROPS);
  }, []);

  return (
    <div id = 'AppContainer'>
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

        <Camera {...SettingsConfig.cameraProps} UpdateOrientation = {setCamOrientation}/>

        <Rubix ref = {cubeRef} {...SettingsConfig.rubixProps} CameraOrientation = {CamOrientation} />
      </Canvas>
      <Settings Settings = {SettingsConfig} UpdateSettings = {setSettingsConfig} ButtonFunctions = {{Scramble_Cube: ScrambleCube, Reset_Cube: ResetCube, Reset_Settings: ResetSettings}}/>
    </div>
  );
}

export default App;
