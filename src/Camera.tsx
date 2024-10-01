import * as THREE from "three"
import React from "react";
import { useFrame } from '@react-three/fiber';
import { degToRad } from "three/src/math/MathUtils";

const ROTATION_TIME_S = 1;

const CAM_DISTANCE_FROM_CENTER = 5;

interface RotationState{
  initalOrientation: THREE.Quaternion,
  currentOrientation: THREE.Quaternion,
  rotatingAgainst: THREE.Quaternion,
  elapsed: number,
  rotating: boolean
}

function CalculatePositionOffOrientation(orientation : THREE.Quaternion){
  let vec3 : THREE.Vector3 = new THREE.Vector3(0,0,1);

  return vec3.applyQuaternion(orientation).multiplyScalar(CAM_DISTANCE_FROM_CENTER);
}

function Camera() {

  const initalState : RotationState = {
    initalOrientation: new THREE.Quaternion(0,0,0),
    currentOrientation: new THREE.Quaternion(0,0,0),
    rotatingAgainst: new THREE.Quaternion(0,0,0),
    elapsed: 0,
    rotating: false
  };

  let [rotation, setRotation] = React.useState(initalState);

  function Rotate(dir : THREE.Quaternion){

    //might change this later
    if (rotation.rotating){
      return;
    }


    let newRotationState : RotationState = {
      initalOrientation: rotation.currentOrientation,
      currentOrientation: new THREE.Quaternion(),
      rotatingAgainst: new THREE.Quaternion().multiplyQuaternions(rotation.currentOrientation, dir),
      elapsed: 0,
      rotating: true
    }
    
    setRotation(newRotationState);
  }

  React.useEffect(() => {
    const onKeyPress = (event: KeyboardEvent) => {
      if (event.repeat){
        return;
      }

      switch (event.code){
        case "ArrowUp":
        Rotate(new THREE.Quaternion().setFromEuler(new THREE.Euler(degToRad(-90), 0, 0)));
        break;
        case "ArrowDown":
        Rotate(new THREE.Quaternion().setFromEuler(new THREE.Euler(degToRad(90), 0, 0)),);
        break;
        case "ArrowRight":
        Rotate(new THREE.Quaternion().setFromEuler(new THREE.Euler(0, degToRad(90), 0)));
        break;
        case "ArrowLeft":
        Rotate(new THREE.Quaternion().setFromEuler(new THREE.Euler(0, degToRad(-90), 0)));
        break;
      }
    };
      
    window.addEventListener('keydown', onKeyPress);
    
    return () => {
      window.removeEventListener('keydown', onKeyPress);
    }
  }, [rotation]);

  
  //slerp camera position.
  useFrame((state, delta) => {
    if (rotation.rotating){

      rotation.elapsed += delta;
      
      if (rotation.elapsed > ROTATION_TIME_S){

        rotation.elapsed = ROTATION_TIME_S;

        rotation.rotating = false;
      }

      //rotate camera
      rotation.currentOrientation.slerpQuaternions(rotation.initalOrientation, rotation.rotatingAgainst, rotation.elapsed / ROTATION_TIME_S)
      state.camera.rotation.setFromQuaternion(rotation.currentOrientation);

      //position camera so its centered.
      state.camera.position.set(...CalculatePositionOffOrientation(rotation.currentOrientation).toArray());
    }
  });

  return (
    <React.Fragment/>
  );
}

export default Camera;
