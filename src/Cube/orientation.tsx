import * as THREE from 'three'

import {Face, RubixPartProp} from "./part";
import { degToRad } from 'three/src/math/MathUtils';

const PART_SEPERATION_AMOUNT = 0.005;
const PART_DISTANCE_FROM_CENTER = 1 + PART_SEPERATION_AMOUNT;

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

    let prop : RubixPartProp = {position: new THREE.Vector3(depth * PART_DISTANCE_FROM_CENTER, layer * PART_DISTANCE_FROM_CENTER, row * PART_DISTANCE_FROM_CENTER), colors: [], rotation: new THREE.Quaternion()};

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

  Rotate(rotationCenter : THREE.Vector3 = new THREE.Vector3(1,0,0), clockwise: boolean = true){
    
    this.parts.forEach(e => console.log("e, ", e));
    this.parts.forEach(e => {

      //x rotation
      if (rotationCenter.x != 0 && e.position.x == rotationCenter.x * PART_DISTANCE_FROM_CENTER){


        /*
          Here are 2 sets of rotations. When y=1 clockwise means rotation1 and counterclockwise means rotation2. y=-1 yeilds opposite results. 
        */
        let useRotation1 : boolean;

        if (rotationCenter.x == 1){
          useRotation1 = clockwise;
        }else{
          useRotation1 = !clockwise;
        }



        if (useRotation1){

          e.position = new THREE.Vector3(
            e.position.x,
            e.position.z,
            -e.position.y
          );
  
          const relativeRotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(
            degToRad(-90),
            0,
            0
          ));

          e.rotation = relativeRotation.multiply(e.rotation);

          /*e.rotation = new THREE.Vector3(
            e.rotation.x + degToRad(-90),
            e.rotation.y,
            e.rotation.z
          )*/

        }else{

          e.position = new THREE.Vector3(
            e.position.x,
            -e.position.z,
            e.position.y
          );
  
          const relativeRotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(
            degToRad(90),
            0,
            0
          ));

          e.rotation = relativeRotation.multiply(e.rotation);

          /*e.rotation = new THREE.Vector3(
            e.rotation.x + degToRad(90),
            e.rotation.y,
            e.rotation.z
          )*/

        }

        
      }


      //y rotation
      if (rotationCenter.y != 0 && e.position.y == rotationCenter.y * PART_DISTANCE_FROM_CENTER){


        /*
          Here are 2 sets of rotations. When y=1 clockwise means rotation1 and counterclockwise means rotation2. y=-1 yeilds opposite results. 
        */
        let useRotation1 : boolean;

        if (rotationCenter.y == 1){
          useRotation1 = clockwise;
        }else{
          useRotation1 = !clockwise;
        }



        if (useRotation1){

          e.position = new THREE.Vector3(
            -e.position.z,
            e.position.y,
            e.position.x
          );
  
  
          const relativeRotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(
            0,
            degToRad(-90),
            0
          ));

          e.rotation = relativeRotation.multiply(e.rotation);


          /*e.rotation = new THREE.Vector3(
            e.rotation.x,
            e.rotation.y + degToRad(-90),
            e.rotation.z,
          )*/

        }else{

          e.position = new THREE.Vector3(
            e.position.z,
            e.position.y,
            -e.position.x
          );
  
  
          const relativeRotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(
            0,
            degToRad(90),
            0
          ));

          e.rotation = relativeRotation.multiply(e.rotation);


          /*e.rotation = new THREE.Vector3(
            e.rotation.x,
            e.rotation.y + degToRad(90),
            e.rotation.z,
          )*/

        }

        
      }

      //z rotation
      if (rotationCenter.z != 0 && e.position.z == rotationCenter.z * PART_DISTANCE_FROM_CENTER){


        /*
          Here are 2 sets of rotations. When y=1 clockwise means rotation1 and counterclockwise means rotation2. y=-1 yeilds opposite results. 
        */
        let useRotation1 : boolean;

        if (rotationCenter.y == 1){
          useRotation1 = clockwise;
        }else{
          useRotation1 = !clockwise;
        }



        if (useRotation1){

          e.position = new THREE.Vector3(
            e.position.y,
            -e.position.x,
            e.position.z
          );
  
  
          const relativeRotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(
            0,
            0,
            degToRad(-90)
          ));

          e.rotation = relativeRotation.multiply(e.rotation);

          /*e.rotation = new THREE.Vector3(
            e.rotation.x,
            e.rotation.y,
            e.rotation.z + degToRad(-90),
          )*/

        }else{

          e.position = new THREE.Vector3(
            -e.position.y,
            e.position.x,
            e.position.z
          );
  
  
          const relativeRotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(
            0,
            0,
            degToRad(90)
          ));

          e.rotation = relativeRotation.multiply(e.rotation);


          /*e.rotation = new THREE.Vector3(
            e.rotation.x,
            e.rotation.y,
            e.rotation.z + degToRad(90),
          )*/

        }

        
      }

    })


  }

}