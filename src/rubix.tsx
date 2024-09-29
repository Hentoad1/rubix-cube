import * as THREE from 'three'
import React from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'

import CubePart, {CubeType, CubeColor, CubeProps} from "./cube"

class RubixOrientation {
  
  parts : Array<CubeProps>

  constructor(){
    this.parts = new Array<CubeProps>(27);

    for (let i = 0; i < 27; ++i){
      //Where the part resides on the Y Axis.
      let layer : number = Math.floor(i / 9) - 1;
      
      //Where the part resides on the X Axis
      let depth : number = Math.floor((i % 9) / 3) - 1;
      
      //White the part resides on the Z Axis
      let row : number = i % 3 - 1;

      //The number of axis positions that are not equal to zero: 1 offset is a face center, 2 offsets are a edge and 3 are a corner. 
      let numOffsets : number = (layer == 0 ? 0 : 1) + (depth == 0 ? 0 : 1) + (row == 0 ? 0 : 1);
      let type : CubeType;
      
      switch(numOffsets){
        case 0:
          type = CubeType.CORE;
          break;
        case 1:
          type = CubeType.CENTER;
          break;
        case 2:
          type = CubeType.EDGE;
          break;
        case 3:
          type = CubeType.CORNER;
          break;
        default:
          type = CubeType.CORE;
          break;
      }


      if (type == CubeType.CORNER){
        console.log(depth, layer, row);
      }

      /*
      Cube orientation starts with the white side on top, and the darkest adjacent green side in front.
      This means the faces on each axis are:

      X+: Blue
      X-: Green
      Y+: White
      Y-: Yellow
      Z+: Red
      Z-: Orange

      */

      let color : CubeColor = {x: new THREE.Color("transparent"), y: new THREE.Color("transparent"), z: new THREE.Color("transparent")};
      if (depth == 1){
        color.x = new THREE.Color("blue");
      }else if (depth == -1){
        color.x = new THREE.Color("green");
      }

      if (layer == 1){
        color.y = new THREE.Color("white");
      }else if (layer == -1){
        color.y = new THREE.Color("yellow");
      }

      if (row == 1){
        color.z = new THREE.Color("red");
      }else if (row == -1){
        color.z = new THREE.Color("orange");
      }

      this.parts[i]  = {x: layer, y: depth, z: row, type, color} 
    }
  }

  getParts(){
    return this.parts;
  }


}


function Rubix() {
  let [parts, useParts] = React.useState(new RubixOrientation());

  useThree(({ camera }) => {
    camera.rotation.set(THREE.MathUtils.degToRad(0), THREE.MathUtils.degToRad(0), THREE.MathUtils.degToRad(50));
  });

  return (
    <React.Fragment>
      {parts.getParts().map((e, i) => <CubePart {...e} key = {i}/>)}
    </React.Fragment>
  );
}

export default Rubix;
