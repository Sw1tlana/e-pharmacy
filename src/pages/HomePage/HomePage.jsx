import style from './HomePage.module.css';
import Home from '../../components/Home/Home';
import PromoBanners from '../../components/PromoBanners/PromoBanners';

import React from 'react'

function HomePage() {
  return (
    <div>
      <Home/>
      <PromoBanners/>  
    </div>
  )
}

export default HomePage;
