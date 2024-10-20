import * as THREE from "three"
import React from "react";
import { useFrame } from '@react-three/fiber';
import { degToRad } from "three/src/math/MathUtils";
import { Keybind } from "./Settings/Settings";




interface RotationState{
  initalOrientation: THREE.Quaternion,
  endOrientation: THREE.Quaternion,
  elapsed: number,
  rotating: boolean
}

export interface CameraKeybinds{
  CAMERA_ROTATE_UP: Keybind,
  CAMERA_ROTATE_DOWN: Keybind,
  CAMERA_ROTATE_LEFT: Keybind,
  CAMERA_ROTATE_RIGHT: Keybind
}

export interface CameraProps{
  CAM_ROTATION_TIME_S: number,
  CAM_DISTANCE_FROM_CENTER: number,
  CAM_IS_OFFSET: boolean,
  CAM_WAIT_FOR_ROTATE: boolean,
  UpdateOrientation: Function | undefined
  Keybinds: CameraKeybinds
}

  
function CalculatePositionOffOrientation(orientation : THREE.Quaternion, distance: number){
  let vec3 : THREE.Vector3 = new THREE.Vector3(0,0,1);

  return vec3.applyQuaternion(orientation).multiplyScalar(distance);
}

function Camera(props: CameraProps) {

  const initalState : RotationState = {
    initalOrientation: new THREE.Quaternion(0,0,0),
    endOrientation: new THREE.Quaternion(0,0,0),
    //these vars are set so position is calculated once.
    elapsed: props.CAM_ROTATION_TIME_S,
    rotating: true
  };

  let [rotation, setRotation] = React.useState(initalState);

  React.useEffect(() => {

    let Rotate = (dir : THREE.Quaternion) => {

      //might change this later
      if (props.CAM_WAIT_FOR_ROTATE && rotation.rotating){
        return;
      }
  
      let newRotationState : RotationState = {
        initalOrientation: rotation.endOrientation,
        endOrientation: new THREE.Quaternion().multiplyQuaternions(rotation.endOrientation, dir),
        elapsed: 0,
        rotating: true
      }
      
      setRotation(newRotationState);
    };
    
    const onKeyPress = (event: KeyboardEvent) => {
      if (event.repeat){
        return;
      }

      console.log(props.Keybinds);

      switch (event.code){
        case props.Keybinds.CAMERA_ROTATE_UP.code:
        Rotate(new THREE.Quaternion().setFromEuler(new THREE.Euler(degToRad(-90), 0, 0)));
        break;
        case props.Keybinds.CAMERA_ROTATE_DOWN.code:
        Rotate(new THREE.Quaternion().setFromEuler(new THREE.Euler(degToRad(90), 0, 0)),);
        break;
        case props.Keybinds.CAMERA_ROTATE_RIGHT.code:
        Rotate(new THREE.Quaternion().setFromEuler(new THREE.Euler(0, degToRad(90), 0)));
        break;
        case props.Keybinds.CAMERA_ROTATE_LEFT.code:
        Rotate(new THREE.Quaternion().setFromEuler(new THREE.Euler(0, degToRad(-90), 0)));
        break;
      }
    };
      
    window.addEventListener('keydown', onKeyPress);
    
    return () => {
      window.removeEventListener('keydown', onKeyPress);
    }
  }, [rotation, setRotation, props.Keybinds]);

  React.useEffect(() => {
    if (!rotation.rotating){
      rotation = {
        rotating: true,
        elapsed: props.CAM_ROTATION_TIME_S,
        initalOrientation: rotation.endOrientation,
        endOrientation: rotation.endOrientation,
      }
    }
  }, [props])

  //slerp camera position.
  useFrame((state, delta) => {
    if (rotation.rotating){

      rotation.elapsed += delta;
      
      if (rotation.elapsed > props.CAM_ROTATION_TIME_S){

        rotation.elapsed = props.CAM_ROTATION_TIME_S;

        rotation.rotating = false;

        if (props.UpdateOrientation){
          props.UpdateOrientation(rotation.endOrientation);
        }
      }

      let currentOrientation : THREE.Quaternion = new THREE.Quaternion();

      //rotate camera
      if (props.CAM_IS_OFFSET){
        currentOrientation.slerpQuaternions(rotation.initalOrientation, rotation.endOrientation, rotation.elapsed / props.CAM_ROTATION_TIME_S);
        currentOrientation.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(degToRad(0), degToRad(30), degToRad(0))));
        currentOrientation.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(degToRad(-30), degToRad(0), degToRad(0))));
      }else{
        currentOrientation.slerpQuaternions(rotation.initalOrientation, rotation.endOrientation, rotation.elapsed / props.CAM_ROTATION_TIME_S);
      }

      state.camera.rotation.setFromQuaternion(currentOrientation);

      //position camera so its centered.

      if (props.CAM_IS_OFFSET){
        let camAngle = new THREE.Quaternion().multiplyQuaternions(currentOrientation, new THREE.Quaternion().setFromEuler(new THREE.Euler(degToRad(0), degToRad(0), degToRad(0))));
        state.camera.position.set(...CalculatePositionOffOrientation(camAngle, props.CAM_DISTANCE_FROM_CENTER).toArray());
      }else{
        state.camera.position.set(...CalculatePositionOffOrientation(currentOrientation, props.CAM_DISTANCE_FROM_CENTER).toArray());
      }
    }
  });

  return (
    <React.Fragment/>
  );
}

export default Camera;
