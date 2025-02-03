import style from './FeaturePage.module.css';
import { motion } from 'framer-motion';
import {capsule2x} from '../../shared/images/homePage/index'; 
import { useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import clsx from 'clsx';

const navLinkClass = ({ isActive }) => {
  return clsx(style.detailsLink, {
    [style.active]: isActive,
  })
}

function FeaturePage() {
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/");

  return (
    <section className={style.featureSection}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        <motion.img
          src={capsule2x}
          alt="Capsule"
          animate={{
            scale: [1, 1.1, 1],      
            rotate: [0, 10, -10, 0],        
            y: [0, -10, 0],                   
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={style.imgFeature}
          width={300}
          height={200}
        />

        <h2 className={style.titleFeature}>Online Pharmacy</h2>
        <p className={style.textFeature}>The feature is not available yet.</p>
        <p className={style.textFeature}>We are working on adding new functionality.</p>
        <NavLink className={navLinkClass} to={backLinkRef.current}>Go back</NavLink>
        
      </motion.div>
    </section>  
  )
};

export default FeaturePage;
