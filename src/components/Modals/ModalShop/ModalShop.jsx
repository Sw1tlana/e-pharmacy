import style from './ModalShop.module.css';
import { motion } from 'framer-motion';
import { capsule2x } from '../../../shared/images/homePage/index';


function ModalShop() {
 
  return (
    <section className={style.sectionShop}>
    <motion.div 
      className={style.modalContainer}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <h2 className={style.modalTitle}>
        Call back by phone
        or visit us at the address on the card!
      </h2>
      <img className={style.capsule} src={capsule2x} alt="example" />
    </motion.div>
    </section>
  )
};

export default ModalShop;
