import React from 'react';
import people from '../../assets/people.png';
import ai from '../../assets/london.png';
import './sectionHome.css';

const SectionHome = () => (
  <div className="gpt3__header section__padding" id="home">
    <div className="gpt3__header-content">
      <h1 className="gradient__text">Bienvenido a Checking-Web </h1>
      <p>Una manera facil y rápida de hacer sus registros</p>
      <div className="gpt3__header-content__people">
        <img alt='' src={people} />
        <p>1,600 personas realizarón su reserva en las últimas 24h</p>
        {/* <LoadingCircle /> */}
      </div>
    </div>
    <div className="gpt3__header-image">
      <img alt='' className='img-marca' src={ai} style={{backgroundColor:'rgba(225,225,225,0.2),'}}/>
    </div>
  </div>
);

export default SectionHome;