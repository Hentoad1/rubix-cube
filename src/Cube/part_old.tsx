/*import * as THREE from 'three'
import React, { useState } from 'react'
import { ThreeElements, useFrame } from '@react-three/fiber'

export enum Face{
  TOP,
  BOTTOM,
  LEFT,
  RIGHT,
  BACK,
  FRONT
}


function FaceToMatName(f: Face){
  switch(f){
    case Face.RIGHT:
      return "material-0";
    case Face.LEFT:
      return "material-1";
    case Face.TOP:
      return "material-2";
    case Face.BOTTOM:
      return "material-3";
    case Face.FRONT:
      return "material-4";
    case Face.BACK:
      return "material-5";
  }
}

export interface FaceColor{
  color: THREE.Color,
  face: Face
}

export interface RotationState {
  start: THREE.Quaternion
  end: THREE.Quaternion
}

export interface RubixPartProp{
  position: THREE.Vector3,
  colors: Array<FaceColor>,
  rotation: RotationState
}

function RubixPart(props: RubixPartProp) {

  let [elapsed, setElapsed] = useState(0);

  const ref = React.useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {

    if (elapsed == 1){
      //return;
    } if (elapsed > 1){
      setElapsed(1)
    }else{
      setElapsed(elapsed + delta);
    }
    

    let newRot = new THREE.Euler().setFromQuaternion(new THREE.Quaternion().slerpQuaternions(props.rotation.start, props.rotation.end, elapsed));

    ref.current.rotation.x = newRot.x;
    ref.current.rotation.y = newRot.y;
    ref.current.rotation.z = newRot.z;
  });

  let meshProps : ThreeElements['mesh'] = { position:[props.position.x, props.position.y, props.position.z], rotation:new THREE.Euler().setFromQuaternion(props.rotation.start) };

  return (
    <mesh ref = {ref} {...meshProps}>

      <boxGeometry args={[1, 1, 1]}/>

      {props.colors.map((e, i) => <meshStandardMaterial key = {i} attach={FaceToMatName(e.face)} color={e.color} />)}

    </mesh>
  )
}

export default RubixPart;
*/

export {}