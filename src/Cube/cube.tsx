import React from 'react';
import * as THREE from 'three'

import Part, {Face, RubixPartProp} from "./part";

function CreateRubixCube(){

  let partProps = [];

  for (let i = 0; i < 27; ++i){
    //Where the part resides on the Y Axis.
    let layer : number = Math.floor(i / 9) - 1;
    
    //Where the part resides on the X Axis
    let depth : number = Math.floor((i % 9) / 3) - 1;
    
    //White the part resides on the Z Axis
    let row : number = i % 3 - 1;

    if (layer == 0 && depth == 0 && row == 0){
      //just skip over the core, it will never be seen.
      continue;
    }

    let prop : RubixPartProp = {position: new THREE.Vector3(depth * 1.005, layer * 1.005, row * 1.005), colors: []};

    if (layer == 1){
      //white
      prop.colors.push({color: new THREE.Color("#FFFFFF"), face: Face.TOP});
    } else if (layer == -1){
      //yellow
      prop.colors.push({color: new THREE.Color("#A0A000"), face: Face.BOTTOM});
    }

    if (depth == 1){
      //red
      prop.colors.push({color: new THREE.Color("#FF0000"), face: Face.RIGHT});
    }else if (depth == -1){
      //prop.colors.push({color: new THREE.Color("#DF6F00"), face: Face.LEFT});
      //prop.colors.push({color: new THREE.Color("#AA5500"), face: Face.LEFT});
      prop.colors.push({color: new THREE.Color("#FA5500"), face: Face.LEFT});
    }

    if (row == 1){
      //green
      prop.colors.push({color: new THREE.Color("#007F00"), face: Face.FRONT});
    }else if (row == -1){
      //blue
      prop.colors.push({color: new THREE.Color("#0000FF"), face: Face.BACK});
    }

    //prop.colors.push({color: i % 2 == 0 ? new THREE.Color("green") : new THREE.Color("purple"), face: Face.FRONT});

    partProps.push(prop);
  }

  console.log(partProps);

  return partProps;
}

function Rubix() {

  let parts = CreateRubixCube();

  return (
    <React.Fragment>
      {parts.map((e, i) => <Part key = {i} {...e}/>)}
    </React.Fragment>
  )

  return (
    <Part position = {new THREE.Vector3(-1, 2, -1)} colors = {[{color: new THREE.Color("red"), face: Face.TOP}]}/>
  )
}

export default Rubix;
