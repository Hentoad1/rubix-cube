import * as THREE from 'three'

import React from 'react';

import { ThreeElements, useFrame } from '@react-three/fiber'
import { degToRad } from 'three/src/math/MathUtils';

export interface OrientationConfig {
  PART_SEPERATION_AMOUNT: number,
  PART_ROTATION_TIME_S : number
}

enum Face{
  TOP,
  BOTTOM,
  LEFT,
  RIGHT,
  BACK,
  FRONT
}

interface FaceColor{
  color: THREE.Color,
  face: Face
}

interface PartAnimationKeyframe{
  rotation: THREE.Quaternion
  position: THREE.Vector3
}

interface PartAnimation{
  playing: boolean
  elapsed: number
  needsUpdate: boolean
  start: PartAnimationKeyframe
  end: PartAnimationKeyframe
}

interface Part{
  default_props: PartAnimationKeyframe,
  faces: Array<FaceColor>,
  animation: PartAnimation,
  ref?: React.MutableRefObject<THREE.Mesh>
  elem?: React.JSX.Element
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

function CreateDefaultRubixCube(config: OrientationConfig){
  let parts = [];

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

    let data : Part = 
    {
      default_props:{
        position: new THREE.Vector3(depth, layer, row),
        rotation: new THREE.Quaternion()
      },
      faces: [],
      animation:{
        playing: false,
        elapsed: 0,
        needsUpdate: false,
        start:{
          rotation: new THREE.Quaternion(),
          position: new THREE.Vector3(depth, layer, row)
        },
        end:{
          rotation: new THREE.Quaternion(),
          position: new THREE.Vector3(depth, layer, row)
        }
      }
    };

    if (layer == 1){
      //white
      data.faces.push({color: new THREE.Color("#FFFFFF"), face: Face.TOP});
    } else if (layer == -1){
      //yellow
      data.faces.push({color: new THREE.Color("#A0A000"), face: Face.BOTTOM});
    }

    if (depth == 1){
      //red
      data.faces.push({color: new THREE.Color("#FF0000"), face: Face.RIGHT});
    }else if (depth == -1){
      data.faces.push({color: new THREE.Color("#FA5500"), face: Face.LEFT});
    }

    if (row == 1){
      //green
      data.faces.push({color: new THREE.Color("#007F00"), face: Face.FRONT});
    }else if (row == -1){
      //blue
      data.faces.push({color: new THREE.Color("#0000FF"), face: Face.BACK});
    }

    //prop.colors.push({color: i % 2 == 0 ? new THREE.Color("green") : new THREE.Color("purple"), face: Face.FRONT});

    parts.push(data);
  }

  return parts;
}

function calculatePosWithSeperation(pos: THREE.Vector3, scalar: number){
  return new THREE.Vector3().copy(pos).multiplyScalar(scalar);
}

export default class RubixOrientation {

  parts: Part[];
  config: OrientationConfig;

  constructor(config: OrientationConfig){

    this.config = config;
    this.parts = CreateDefaultRubixCube(config);

    this.parts.forEach((e, i) => {
      const ref = React.useRef<THREE.Mesh>(null!);

      e.ref = ref;

      let meshProps : ThreeElements['mesh'] = { position:calculatePosWithSeperation(e.default_props.position, config.PART_SEPERATION_AMOUNT + 1), rotation:new THREE.Euler().setFromQuaternion(e.default_props.rotation) };

      e.elem = (
        <mesh ref = {ref} key = {i} {...meshProps}>

        <boxGeometry args={[1, 1, 1]}/>
  
        {e.faces.map((e, i) => <meshStandardMaterial key = {i} attach={FaceToMatName(e.face)} color={e.color} />)}
  
        </mesh>
      )
    });
  }

  UpdateConfig(config: OrientationConfig){
    this.config = config;
    this.parts.forEach(e => e.animation.needsUpdate = true);
  }
  
  GetElems(){
    return this.parts.map(e => e.elem);
  }

  Update(delta: number){

    const PART_DISTANCE_FROM_CENTER = 1 + this.config.PART_SEPERATION_AMOUNT;

    this.parts.forEach(e => {
      if (e.animation.playing){
        
        e.animation.elapsed += delta;

        if (e.animation.elapsed > this.config.PART_ROTATION_TIME_S){
          e.animation = {
            playing:false,
            elapsed:0,
            needsUpdate: true,
            start: {
              position: e.animation.end.position,
              rotation: e.animation.end.rotation
            },
            end: {
              position: e.animation.end.position,
              rotation: e.animation.end.rotation
            }
          }
        }

        let currentRotQuat = new THREE.Quaternion().slerpQuaternions(e.animation.start.rotation, e.animation.end.rotation, e.animation.elapsed / this.config.PART_ROTATION_TIME_S);
        let currentRotEuler = new THREE.Euler().setFromQuaternion(currentRotQuat);
        
        let currentPos = new THREE.Vector3().copy(e.default_props.position).applyQuaternion(currentRotQuat).multiplyScalar(PART_DISTANCE_FROM_CENTER);

        if (e.ref){
          e.ref.current.position.x = currentPos.x;
          e.ref.current.position.y = currentPos.y;
          e.ref.current.position.z = currentPos.z;

          e.ref.current.rotation.x = currentRotEuler.x;
          e.ref.current.rotation.y = currentRotEuler.y;
          e.ref.current.rotation.z = currentRotEuler.z;
        }
      }

      //note: !e.animation.playing isnt the same as using and else because the var can be changed in the if statement.
      if (!e.animation.playing && e.animation.needsUpdate){
        if (e.ref){
          let scaledPos = calculatePosWithSeperation(e.animation.end.position, PART_DISTANCE_FROM_CENTER);

          e.ref.current.position.x = scaledPos.x;
          e.ref.current.position.y = scaledPos.y;
          e.ref.current.position.z = scaledPos.z;

          let endRotEuler = new THREE.Euler().setFromQuaternion(e.animation.end.rotation);
          
          e.ref.current.rotation.x = endRotEuler.x;
          e.ref.current.rotation.y = endRotEuler.y;
          e.ref.current.rotation.z = endRotEuler.z;
        }
      }


    });
  }

  Rotate(rotationCenter : THREE.Vector3 = new THREE.Vector3(1,0,0), clockwise: boolean = true){
    this.parts.forEach(e => {

      let startRot : THREE.Quaternion = e.animation.end.rotation;
      let endRot : THREE.Quaternion = new THREE.Quaternion();

      let startPos : THREE.Vector3 = e.animation.end.position;
      let endPos : THREE.Vector3 = new THREE.Vector3();

      let isRotating : boolean = false;

      //x rotation
      if (rotationCenter.x != 0 && startPos.x == rotationCenter.x){

        isRotating = true;
        
        //Here are 2 sets of rotations. When y=1 clockwise means rotation1 and counterclockwise means rotation2. y=-1 yeilds opposite results. 
        
        let useRotation1 : boolean;

        if (rotationCenter.x == 1){
          useRotation1 = clockwise;
        }else{
          useRotation1 = !clockwise;
        }



        if (useRotation1){

          endPos = new THREE.Vector3(
            startPos.x,
            startPos.z,
            -startPos.y
          );

          const relativeRotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(
            degToRad(-90),
            0,
            0
          ));

          endRot = relativeRotation.multiply(startRot);

        }else{

          endPos = new THREE.Vector3(
            startPos.x,
            -startPos.z,
            startPos.y
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
      if (rotationCenter.y != 0 && startPos.y == rotationCenter.y){

        isRotating = true;


        
        //Here are 2 sets of rotations. When y=1 clockwise means rotation1 and counterclockwise means rotation2. y=-1 yeilds opposite results. 
        
        let useRotation1 : boolean;

        if (rotationCenter.y == 1){
          useRotation1 = clockwise;
        }else{
          useRotation1 = !clockwise;
        }



        if (useRotation1){

          endPos = new THREE.Vector3(
            -startPos.z,
            startPos.y,
            startPos.x
          );
  
  
          const relativeRotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(
            0,
            degToRad(-90),
            0
          ));

          endRot = relativeRotation.multiply(startRot);

        }else{

          endPos = new THREE.Vector3(
            startPos.z,
            startPos.y,
            -startPos.x
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
      if (rotationCenter.z != 0 && startPos.z == rotationCenter.z){

        isRotating = true;


        
        //Here are 2 sets of rotations. When y=1 clockwise means rotation1 and counterclockwise means rotation2. y=-1 yeilds opposite results. 
        
        let useRotation1 : boolean;

        if (rotationCenter.y == 1){
          useRotation1 = clockwise;
        }else{
          useRotation1 = !clockwise;
        }



        if (useRotation1){

          endPos = new THREE.Vector3(
            startPos.y,
            -startPos.x,
            startPos.z
          );
  
  
          const relativeRotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(
            0,
            0,
            degToRad(-90)
          ));

          endRot = relativeRotation.multiply(startRot);

        }else{

          endPos = new THREE.Vector3(
            -startPos.y,
            startPos.x,
            startPos.z
          );
  
  
          const relativeRotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(
            0,
            0,
            degToRad(90)
          ));

          endRot = relativeRotation.multiply(startRot);

        }

        
      }

      if (isRotating){
        
        //If a part is rotating, we want to create an actual animation with a start and an end.
        e.animation = {
          playing: true,
          elapsed: 0,
          needsUpdate: false,
          start:{
            rotation: startRot,
            position: startPos
          },
          end: {
            rotation: endRot,
            position: endPos
          }
        }


      }else{

        //If a part is not rotating, then we want to flush any animation that could be playing.
        e.animation = {
          playing: true,
          elapsed: 0,
          needsUpdate: true,
          start:{
            rotation: e.animation.end.rotation,
            position: e.animation.end.position
          },
          end: {
            rotation: e.animation.end.rotation,
            position: e.animation.end.position
          }
        }

      }
      

    })


  }

}