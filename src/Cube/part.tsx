import * as THREE from 'three'
import React from 'react'
import { ThreeElements } from '@react-three/fiber'

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

export interface RubixPartProp{
  position: THREE.Vector3,
  colors: Array<FaceColor>,
  rotation: THREE.Vector3
}

function RubixPart(props: RubixPartProp) {


  const ref = React.useRef<THREE.Mesh>(null!);

  //useFrame((state, delta) => ref.current.rotation.y += delta);

  let meshProps : ThreeElements['mesh'] = { position:[props.position.x, props.position.y, props.position.z], rotation:[props.rotation.x, props.rotation.y, props.rotation.z] };

  return (
    <mesh ref = {ref} {...meshProps}>

      <boxGeometry args={[1, 1, 1]}/>

      {props.colors.map((e, i) => <meshStandardMaterial key = {i} attach={FaceToMatName(e.face)} color={e.color} />)}

    </mesh>
  )
}

export default RubixPart;
