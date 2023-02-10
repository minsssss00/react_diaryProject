import React from 'react';
import {Link} from 'react-router-dom';
import WeatherInfo from '../pages/WeatherInfo';

const Main = () => {

  return (
    <div className='home'>
    <div className='shadow'>
        <h1>
          HOW <span className='a'>WAS</span> <br/>IT TODAY<span className='b'>?</span>
          <Link to = "/home">
          <button className='goHome'>home</button>
        </Link>
        <WeatherInfo />
        </h1>

      </div>
    </div>
  );
};

export default Main;