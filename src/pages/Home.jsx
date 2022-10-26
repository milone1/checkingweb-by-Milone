import React from 'react';
// import { FormPassenger } from '../components/formPassenger';
// import './ManualParallax.css';
import { useParams } from 'react-router-dom';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import FooterSection from '../components/sections/SectionFooter';
import SectionHome from '../components/sections/SectionHome';
import { Carousel } from 'react-responsive-carousel';
import { FormPassenger } from '../forms/FormPassenger';
import ImageSlider from './ImageSlider';

export const HomePage = () => {

  const params = useParams();

  var indents = [];

  for (var i = 0; i <= parseInt(params.numPassenger - 1); i++) {
    indents.push(<FormPassenger id={i} key={i} />);
  }

  var indents = [];

  for (var i = 0; i <= parseInt(params.numPassenger - 1); i++) {
    indents.push(<FormPassenger id={i} key={i} />);
  }

  const containerStyles = {
    width: "99%",
    height: "100vh",
    margin: "10",
  };
  return (
    <div>
      <ResponsiveAppBar />
      <div className='bgimg-1'>
        <SectionHome />
      </div>
      <div className='bgimg-2'>
        <div style={containerStyles}>
          <ImageSlider slides={indents} />
        </div>
      </div>
      <div className='bgimg-3'>
        <FooterSection />
      </div>
    </div>
  );
}
