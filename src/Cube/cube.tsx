import React from 'react';

import * as THREE from "three"

import Part from "./part";
import RubixOrientation from './orientation';


function Rubix() {

  let parts = new RubixOrientation();

  parts.Rotate();
  parts.Rotate(new THREE.Vector3(0, 1, 0));
  parts.Rotate();

  return (
    <React.Fragment>
      {parts.GetProps().map((e, i) => <Part key = {i} {...e}/>)}
    </React.Fragment>
  )
}


export default Rubix;
