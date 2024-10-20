import React from 'react';

import * as THREE from "three"

import { useFrame } from '@react-three/fiber'

import RubixOrientation, {OrientationConfig} from './orientation';
import { Keybind } from '../Settings/Settings';

interface RubixKeybinds {
  ShiftToInvert: boolean,
  ROTATE_TOP_C: Keybind,
  ROTATE_TOP_CC: Keybind,
  ROTATE_BOTTOM_C: Keybind,
  ROTATE_BOTTOM_CC: Keybind,
  ROTATE_LEFT_C: Keybind,
  ROTATE_LEFT_CC: Keybind,
  ROTATE_RIGHT_C: Keybind,
  ROTATE_RIGHT_CC: Keybind,
  ROTATE_FRONT_C: Keybind,
  ROTATE_FRONT_CC: Keybind,
  ROTATE_BACK_C: Keybind,
  ROTATE_BACK_CC: Keybind,
}

export interface RubixProps {
  CameraOrientation: THREE.Quaternion
  Config: OrientationConfig
  Keybinds: RubixKeybinds
}

export type RubixHandle = {
  Scramble: () => void,
  Reset: () => void,
};

const Rubix = React.forwardRef<RubixHandle, RubixProps>((props, ref) => {

  let parts = React.useRef(new RubixOrientation(props.Config));

  React.useImperativeHandle(ref, () => ({
    Reset(){
      parts.current.Reset();
    },
    Scramble(){
      parts.current.Scramble();
    }
  }));

  useFrame((_, delta) => {
    parts.current.Update(delta);
  })

  React.useEffect(() => {

    const Rotate = (dir: THREE.Vector3, clockwise: boolean) => {
      let adjustedDir = dir.applyQuaternion(props.CameraOrientation).round();

      parts.current.Rotate(adjustedDir, clockwise);
    };

    const onKeyPress = (event: KeyboardEvent) => {
      if (event.repeat){
        return;
      }

      console.log(props.Keybinds.ShiftToInvert);
      console.log(event.shiftKey);
      console.log(event.key);
      console.log(props.Keybinds);

      if (props.Keybinds.ShiftToInvert){
        switch (event.code){

          case props.Keybinds.ROTATE_LEFT_C.code:
          Rotate(new THREE.Vector3(-1, 0, 0), !event.shiftKey);
          break;
  
          case props.Keybinds.ROTATE_RIGHT_C.code:
          Rotate(new THREE.Vector3(1, 0, 0), !event.shiftKey);
          break;
  
          case props.Keybinds.ROTATE_TOP_C.code:
          Rotate(new THREE.Vector3(0, 1, 0), !event.shiftKey);
          break;
  
          case props.Keybinds.ROTATE_BOTTOM_C.code:
          Rotate(new THREE.Vector3(0, -1, 0), !event.shiftKey);
          break;
  
          case props.Keybinds.ROTATE_FRONT_C.code:
          Rotate(new THREE.Vector3(0, 0, 1), !event.shiftKey);
          break;
  
          case props.Keybinds.ROTATE_BACK_C.code:
          Rotate(new THREE.Vector3(0, 0, -1), !event.shiftKey);
          break;
        }
      }else{
        switch (event.code){

          case props.Keybinds.ROTATE_LEFT_C.code:
          Rotate(new THREE.Vector3(-1, 0, 0), true);
          break;

          case props.Keybinds.ROTATE_LEFT_CC.code:
          Rotate(new THREE.Vector3(-1, 0, 0), false);
          break;
  
          case props.Keybinds.ROTATE_RIGHT_C.code:
          Rotate(new THREE.Vector3(1, 0, 0), true);
          break;
  
          case props.Keybinds.ROTATE_RIGHT_CC.code:
          Rotate(new THREE.Vector3(1, 0, 0), false);
          break;
  
          case props.Keybinds.ROTATE_TOP_C.code:
          Rotate(new THREE.Vector3(0, 1, 0), true);
          break;
  
          case props.Keybinds.ROTATE_TOP_CC.code:
          Rotate(new THREE.Vector3(0, 1, 0), false);
          break;
  
          case props.Keybinds.ROTATE_BOTTOM_C.code:
          Rotate(new THREE.Vector3(0, -1, 0), true);
          break;
  
          case props.Keybinds.ROTATE_BOTTOM_CC.code:
          Rotate(new THREE.Vector3(0, -1, 0), false);
          break;
  
          case props.Keybinds.ROTATE_FRONT_C.code:
          Rotate(new THREE.Vector3(0, 0, 1), true);
          break;
  
          case props.Keybinds.ROTATE_FRONT_CC.code:
          Rotate(new THREE.Vector3(0, 0, 1), false);
          break;
  
          case props.Keybinds.ROTATE_BACK_C.code:
          Rotate(new THREE.Vector3(0, 0, -1), true);
          break;
  
          case props.Keybinds.ROTATE_BACK_CC.code:
          Rotate(new THREE.Vector3(0, 0, -1), false);
          break;
        }
      }

      
    };
      
    window.addEventListener('keydown', onKeyPress);
    
    return () => {
      window.removeEventListener('keydown', onKeyPress);
    }
  }, [parts, props.CameraOrientation, props.Keybinds]);

  React.useEffect(() => {
    parts.current.UpdateConfig(props.Config);
  }, [props.Config])

  return (
    <React.Fragment>
      {parts.current.GetElems()}
    </React.Fragment>
  )
})


export default Rubix;
