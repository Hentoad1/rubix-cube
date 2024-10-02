import './App.css';
import { Canvas } from '@react-three/fiber'

import * as THREE from "three"
import React from "react";

import Rubix from "./Cube/cube";
import Camera from "./Camera";

//customizeable vars:
const DEFINE_ROTATION_TIME_S = 1;
const DEFINE_CAM_DISTANCE_FROM_CENTER = 5;
const DEFINE_CAM_IS_OFFSET = true;

function App() {



  return (
    <Canvas>

      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

      <Camera ROTATION_TIME_S = {DEFINE_ROTATION_TIME_S} CAM_DISTANCE_FROM_CENTER = {DEFINE_CAM_DISTANCE_FROM_CENTER} CAM_IS_OFFSET = {DEFINE_CAM_IS_OFFSET}/>

      <Rubix/>
    </Canvas>
  );
}

export default App;
