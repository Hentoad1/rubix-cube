/*import * as THREE from 'three'

import React from 'react';

import {  Face, RubixPartProp, RotationState } from "./part";
import { degToRad } from 'three/src/math/MathUtils';
import { ThreeElements, useFrame } from '@react-three/fiber'

const PART_SEPERATION_AMOUNT = 0.005;
const PART_DISTANCE_FROM_CENTER = 1 + PART_SEPERATION_AMOUNT;

interface Part{
  props: ThreeElements['mesh'],
  animation: 
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

    let prop : RubixPartProp = {
      position: new THREE.Vector3(depth * PART_DISTANCE_FROM_CENTER, layer * PART_DISTANCE_FROM_CENTER, row * PART_DISTANCE_FROM_CENTER),
      colors: [],
      rotation: {
        start: new THREE.Quaternion(),
        end: new THREE.Quaternion()
      }
    };

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

  //parts: RubixPartProp[];

  constructor(){
    let parts = CreateRubixCube();

    let elems = [];
    let refs = [];

    

    parts.forEach(e => {
      const ref = React.useRef<THREE.Mesh>(null!);

      let meshProps : ThreeElements['mesh'] = { position:[e.position.x, e.position.y, e.position.z], rotation:new THREE.Euler().setFromQuaternion(e.rotation.start) };

      refs.push(ref);
      elems.push((
        <mesh ref = {ref} {...meshProps}>

        <boxGeometry args={[1, 1, 1]}/>
  
        {e.colors.map((e, i) => <meshStandardMaterial key = {i} attach={FaceToMatName(e.face)} color={e.color} />)}
  
        </mesh>
        ))
    })

  }

  GetProps(){
    return this.parts;
  }

  Rotate(rotationCenter : THREE.Vector3 = new THREE.Vector3(1,0,0), clockwise: boolean = true){
    

    this.parts.forEach(e => {

      let startRot : THREE.Quaternion = e.rotation.end;
      let endRot : THREE.Quaternion = new THREE.Quaternion();

      //x rotation
      if (rotationCenter.x != 0 && e.position.x == rotationCenter.x * PART_DISTANCE_FROM_CENTER){


        
        //Here are 2 sets of rotations. When y=1 clockwise means rotation1 and counterclockwise means rotation2. y=-1 yeilds opposite results. 
        
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

          endRot = relativeRotation.multiply(startRot);

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

          endRot = relativeRotation.multiply(startRot);

        }

        
      }

      //y rotation
      if (rotationCenter.y != 0 && e.position.y == rotationCenter.y * PART_DISTANCE_FROM_CENTER){


        
        //Here are 2 sets of rotations. When y=1 clockwise means rotation1 and counterclockwise means rotation2. y=-1 yeilds opposite results. 
        
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

          endRot = relativeRotation.multiply(startRot);

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

          endRot = relativeRotation.multiply(startRot);

        }

        
      }

      //z rotation
      if (rotationCenter.z != 0 && e.position.z == rotationCenter.z * PART_DISTANCE_FROM_CENTER){


        
        //Here are 2 sets of rotations. When y=1 clockwise means rotation1 and counterclockwise means rotation2. y=-1 yeilds opposite results. 
        
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

          endRot = relativeRotation.multiply(startRot);

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

          endRot = relativeRotation.multiply(startRot);

        }

        
      }

      e.rotation = {
        start: startRot,
        end: endRot
      }

    })


  }

}*/

export {}