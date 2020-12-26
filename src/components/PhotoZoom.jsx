import React from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
 
function ImageZoom (props){
  return(
      <Zoom>
        <img
        alt="that wanaka tree"
        src={props.src}
        width="500"
        />
    </Zoom> )
}

export default ImageZoom