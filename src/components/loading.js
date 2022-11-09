import React from "react";
import './loading.css'
const LoadingCircle = () => {
  return(
    <div className='spinner-box'>
     <div className='circle-border'>
      <div className='circle-core'></div>
     </div>
    </div>
  );
}
export default LoadingCircle;
