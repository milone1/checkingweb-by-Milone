import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { FormPassenger } from "../forms/FormPassenger";
import { motion } from 'framer-motion';
import '../components/slider.css'
import { useEffect } from "react";
const SliderDem = () => {
  const params = useParams();
  const [width, setWidth] = useState(0);
  const carousel = useRef();


  var indents = [];
  for (var i = 0; i <= parseInt(params.numPassenger - 1); i++) {
    indents.push(<FormPassenger id={i} key={i} />);
  }
  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
  }, [])
  return (
    <center>
      <motion.div
        ref={carousel}
        className="carousel-dem"
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          className="inner-carousel-dem"
          drag='x'
          dragConstraints={{right: width, left: -width }}
        >
          {indents}
        </motion.div>
      </motion.div>
    </center>
  );
}
export default SliderDem