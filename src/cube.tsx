import * as THREE from 'three'
import React from 'react'
import { Canvas, ThreeElements, useFrame } from '@react-three/fiber'

export enum CubeType{
  CENTER,
  CORNER,
  EDGE,

  //Core is the very center of the cube itself. It should not render anything.
  CORE
}

export interface CubeColor{
  x : THREE.Color,
  y : THREE.Color,
  z : THREE.Color
}

export interface CubeProps{
  //Must be -1, 0, 1
  x : number, 

  //Must be -1, 0, 1
  y : number, 

  //Must be -1, 0, 1
  z : number,
  type : CubeType,
  color : CubeColor,
}

function CubeCornerPart(props: CubeProps){
  
  /*
  There will be one mesh per color, so for corner there will be 3 seperate meshes.
  */

  //vector facing from center towards part of cube
  let outvec = {
    x: props.x,
    y: props.y,
    z: props.z
  }

  //chunk one: x face
  let meshOne : Array<number> = [
    0, 0, 0,
    outvec.x, 0, 0,
    outvec.x, outvec.y, 0,
    outvec.x, 0, outvec.z,
    outvec.x, outvec.z, outvec.z
  ];

  let indicesOne: Array<number> = [
    0, 1, 2,
    0, 1, 3,
    1, 2, 4,
    1, 3, 4
  ]



  //chunk two: y face
  let meshTwo : Array<number> = [
    0, 0, 0,
    0, outvec.y, 0,
    outvec.x, outvec.y, 0,
    0, outvec.y, outvec.z,
    outvec.x, outvec.z, outvec.z
  ];

  let indicesTwo: Array<number> = [
    0, 1, 2,
    0, 1, 3,
    1, 2, 4,
    1, 3, 4
  ]

  

  //chunk three: z face
  let meshThree : Array<number> = [
    0, 0, 0,
    0, 0, outvec.z,
    outvec.x, 0, outvec.z,
    0, outvec.y, outvec.z,
    outvec.x, outvec.z, outvec.z
  ];

  let indicesThree: Array<number> = [
    0, 1, 2,
    0, 1, 3,
    1, 2, 4,
    1, 3, 4
  ]

  console.log(meshOne);
  console.log(indicesOne);


  return (
    <React.Fragment>
      <mesh>
        <polyhedronGeometry args = {[meshOne, indicesOne, 1, 2]}/>
        <meshStandardMaterial color = {props.color.x} />
      </mesh>

      
      <mesh>
        <polyhedronGeometry args = {[meshTwo, indicesTwo, 1, 2]}/>
        <meshStandardMaterial color = {props.color.y} />
      </mesh>


      <mesh>
        <polyhedronGeometry args = {[meshThree, indicesThree, 1, 2]}/>
        <meshStandardMaterial color = {props.color.z} />
      </mesh>
    </React.Fragment>
  )
}

function CubePart(props: CubeProps) {

  /*if (props.type == CubeType.CORNER){
    return CubeCornerPart(props);
  }*/

  // This reference gives us direct access to the THREE.Mesh object
  const ref = React.useRef<THREE.Mesh>(null!);
  // Hold state for hovered and clicked events
  const [hovered, hover] = React.useState(false);
  const [clicked, click] = React.useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  //useFrame((state, delta) => (ref.current.rotation.y += delta))
  // Return the view, these are regular Threejs elements expressed in JSX

  let meshProps : ThreeElements['mesh'] = { position:[props.x, props.y, props.z]};

  //meshProps can be used to rotate

 /* if (props.x == -1 || props.z == -1 || props.y == -1){
    return <React.Fragment></React.Fragment>
  }*/



  return (
    <mesh
      {...meshProps}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>

      {props.type == CubeType.CORNER ? CubeCornerPart(props) : null}
      <boxGeometry args={[1, 0.5, 1]}/>
      <meshStandardMaterial color={hovered ? 'hotpink' : 'blue'} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'yellow'} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'purple'} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'red'} />
      <meshStandardMaterial attach="material-0" color={hovered ? 'hotpink' : 'orange'} vertexColors = {true} />
      <meshStandardMaterial attach="material-1" color={hovered ? 'hotpink' : 'green'} vertexColors = {true} />

      
      {/*<boxGeometry attach="geometry" args={[2, 2, 2]} />
      <meshStandardMaterial attach="material-0" color="#00FF00" />
      <meshStandardMaterial attach="material-1" color="#FF0000" />
      <meshStandardMaterial attach="material-2" color="#0000FF" />
      <meshStandardMaterial attach="material-3" color="#FFFF00" />
      <meshStandardMaterial attach="material-4" color="#FF00FF" />
      <meshStandardMaterial attach="material-5" color="#00FFFF" />*/}
    </mesh>
  )
}

export default CubePart;
