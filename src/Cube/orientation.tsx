import * as THREE from 'three'

import {Face, RubixPartProp} from "./part";
import { degToRad } from 'three/src/math/MathUtils';

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

    let prop : RubixPartProp = {position: new THREE.Vector3(depth * 1.005, layer * 1.005, row * 1.005), colors: [], rotation: new THREE.Vector3()};

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

  return partProps;
}

export default class RubixOrientation {

  parts: RubixPartProp[];

  constructor(){
    this.parts = CreateRubixCube();
  }

  GetProps(){
    return this.parts;
  }

  Rotate(rotationCenter : THREE.Vector3 = new THREE.Vector3(0,1,0), clockwise: boolean = true){
    
    this.parts.forEach(e => console.log("e, ", e));
    this.parts.forEach(e => {
      if (e.position.y >= 1){

        if (clockwise){

          e.position = new THREE.Vector3(
            -e.position.z,
            e.position.y,
            e.position.x
          );
  
          e.rotation = new THREE.Vector3(
            e.rotation.x,
            e.rotation.y + degToRad(-90),
            e.rotation.z,
          )

        }else{

          e.position = new THREE.Vector3(
            e.position.z,
            e.position.y,
            -e.position.x
          );
  
          e.rotation = new THREE.Vector3(
            e.rotation.x,
            e.rotation.y + degToRad(90),
            e.rotation.z,
          )

        }

        
      }
    })


  }

}