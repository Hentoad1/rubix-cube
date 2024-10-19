import React from 'react';

import * as THREE from "three"

import { useFrame } from '@react-three/fiber'

import RubixOrientation, {OrientationConfig} from './orientation';

export interface RubixProps {
  CameraOrientation: THREE.Quaternion
  Config: OrientationConfig
}

export type RubixHandle = {
  Scramble: () => void,
  Reset: () => void,
};

const Rubix = React.forwardRef<RubixHandle, RubixProps>((props, ref) => {

  //let p = React.useRef();

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
      
      switch (event.code){

        case "KeyA":
        Rotate(new THREE.Vector3(-1, 0, 0), event.shiftKey);
        break;

        case "KeyD":
        Rotate(new THREE.Vector3(1, 0, 0), event.shiftKey);
        break;

        case "KeyW":
        Rotate(new THREE.Vector3(0, 1, 0), event.shiftKey);
        break;

        case "KeyS":
        Rotate(new THREE.Vector3(0, -1, 0), event.shiftKey);
        break;

        case "KeyQ":
        Rotate(new THREE.Vector3(0, 0, 1), event.shiftKey);
        break;

        case "KeyE":
        Rotate(new THREE.Vector3(0, 0, -1), event.shiftKey);
        break;
      }
    };
      
    window.addEventListener('keydown', onKeyPress);
    
    return () => {
      window.removeEventListener('keydown', onKeyPress);
    }
  }, [parts, props.CameraOrientation]);

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
