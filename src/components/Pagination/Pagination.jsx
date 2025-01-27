import style from './Pagination.module.css';
import { icons as sprite } from '../../shared/icons/index';
import clsx from 'clsx';

function Pagination({ totalPages, onPageChange, currentPage }) {
    const getPages = () => {
     const pages = [];

     for(let i = 1; i <= totalPages; i++) {
      pages.push(i);
     }
     return pages;
    };

    const handlePrevious = () => {
       if(currentPage > 1) {
        onPageChange(currentPage -1);
       }
    };

    const handleNext = () => {
        if(currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    }

  return (
    <div className={style.containerSlider}>

      <svg 
      onClick={handlePrevious} 
      width={44} height={44} 
      className={clsx(style.iconParagrapf, {
        [style.disabled]: currentPage === 1,
        [style.activeParagraf]: currentPage > 1,  
      })}>
        <use xlinkHref={`${sprite}#icon-slider-left-two`} />
      </svg>

      <svg 
      onClick={handlePrevious} 
      width={44} height={44} 
      className={clsx(style.iconParagrapf, {
        [style.disabled]: currentPage === 1,
        [style.activeParagraf]: currentPage > 1, 
      })}>
        <use xlinkHref={`${sprite}#icon-slider-left`} />
      </svg>

    <div className={style.paginationContainer}>
        {getPages().map((page) => (
            <button
            key={page}
            className={clsx(style.pageCircle, {
              [style.activeCircle]: page === currentPage, 
          })}
          onClick={() => {
            onPageChange(page);
        }}>
                {page}
            </button>
        ))}
    </div>
    
      <svg
      onClick={handleNext} 
      width={44} height={44} 
      className={clsx(style.iconParagrapf, {
        [style.disabled]: currentPage === totalPages,
        [style.activeNext]: currentPage < totalPages, 
      })}>
         <use xlinkHref={`${sprite}#icon-slider-right`} />
      </svg>

       <svg
       onClick={handleNext}  
       width={44} height={44} 
       className={clsx(style.iconParagrapf, {
        [style.disabled]: currentPage === totalPages,
        [style.activeNext]: currentPage < totalPages, 
      })}
       >
          <use xlinkHref={`${sprite}#icon-slider-right-two`} />
      </svg>
    </div>
  )
};

export default Pagination;
