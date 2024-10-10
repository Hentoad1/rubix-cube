import React from 'react';

import * as THREE from "three"

import { useFrame } from '@react-three/fiber'


//import Part from "./part";
import RubixOrientation from './orientation';


function Rubix() {

  let parts = new RubixOrientation();

  parts.Rotate();
  parts.Rotate(new THREE.Vector3(0, 1, 0));
  //parts.Rotate();

  useFrame((_, delta) => {
    parts.Update(delta);
  })

  return (
    <React.Fragment>
      {parts.GetElems()}
    </React.Fragment>
  )
}


export default Rubix;
