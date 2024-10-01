import './App.css';
import { Canvas } from '@react-three/fiber'
import { Stats, OrbitControls } from '@react-three/drei'

import * as THREE from "three"
import React from "react";

import Rubix from "./Cube/cube";
import Camera from "./Camera";


function App() {



  return (
    <Canvas>

      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

      {/*<OrbitControls/>*/}

      <Camera/>
      <Rubix/>
    </Canvas>
  );
}

export default App;
