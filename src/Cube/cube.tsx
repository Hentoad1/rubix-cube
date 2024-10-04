import React from 'react';

import Part from "./part";
import RubixOrientation from './orientation';


function Rubix() {

  let parts = new RubixOrientation();

  parts.Rotate();

  return (
    <React.Fragment>
      {parts.GetProps().map((e, i) => <Part key = {i} {...e}/>)}
    </React.Fragment>
  )
}


export default Rubix;
