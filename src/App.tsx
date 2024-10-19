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
    UpdateOrientation: undefined
  },
  rubixProps: {
    CameraOrientation: new THREE.Quaternion(),
    Config:{ 
      PART_SEPERATION_AMOUNT: 0.005,
      PART_ROTATION_TIME_S : 0.1
    }
  }
}

/*const DEFINE_CAM_PROPS : CameraProps = {
  CAM_ROTATION_TIME_S: 1,
  CAM_DISTANCE_FROM_CENTER: 5,
  CAM_IS_OFFSET: true,
  CAM_WAIT_FOR_ROTATE: true,
  UpdateOrientation: undefined
}

const DEFINE_RUBIX_PROPS : RubixProps = {
  CameraOrientation: new THREE.Quaternion(),
  Config:{ 
    PART_SEPERATION_AMOUNT: 0.005,
    PART_ROTATION_TIME_S : 0.1
  }
}*/

function App() {

  let [CamOrientation, setCamOrientation] = React.useState<THREE.Quaternion>(new THREE.Quaternion());

  let [SettingsConfig, setSettingsConfig] = React.useState<SettingsConfig>(DEFAULT_PROPS);

  React.useEffect(() => {
    console.log(SettingsConfig);
  }, [SettingsConfig])

  let cubeRef = React.useRef<RubixHandle>(null);

  let ScrambleCube = React.useCallback(() => {
    cubeRef?.current?.Scramble();
  }, []);

  let ResetCube = React.useCallback(() => {
    cubeRef?.current?.Reset();
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
      <Settings Settings = {SettingsConfig} UpdateSettings = {setSettingsConfig} ButtonFunctions = {{Scramble: ScrambleCube, Reset: ResetCube}}/>
    </div>
  );
}

export default App;
