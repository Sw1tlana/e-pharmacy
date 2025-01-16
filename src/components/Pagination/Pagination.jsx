import style from './Pagination.module.css';
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
    <div className={style.paginationContainer}>
        {getPages().map((page) => (
            <button
            key={page}
            className={clsx(style.pageCircle, {
                [style.active]: page === currentPage, 
              })}
              onClick={() => onPageChange(page)}>
                {page}
            </button>
        ))}
    </div>
  )
};

export default Pagination;
