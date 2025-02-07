import style from './MedicineSearch.module.css';
import Select from 'react-select';
import { icons as sprite } from '../../shared/icons';
import { fetchMedicines } from '../../redux/medicine/operations';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchQuery, 
         selectSelectedCategory } 
         from '../../redux/medicine/selectors';
import { resetFilters,
         setSearchQuery, 
         setSelectedCategory } from '../../redux/medicine/slice';

function MedicineSearch() {
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectSearchQuery);
  const selectedCategory = useSelector(selectSelectedCategory);

  const categoryOption = [
    { value: "Medicine", label: "Medicine" },
    { value: "Heart", label: "Heart" },
    { value: "Head", label: "Head" },
    { value: "Hand", label: "Hand" },
    { value: "Leg", label: "Leg" },
    { value: "Dental Care", label: "Dental Care" },
    { value: "Skin Care", label: "Skin Care" }
  ];
    
  const handleCategoryChange = (selectedOption) => {
    dispatch(setSelectedCategory(selectedOption));
  
    const query = searchQuery.trim() || null;
  
    const filters = {
      category: selectedOption ? selectedOption.value : undefined,  
      query: query,
      page: 1,
      limit: 12,
    };
  
    dispatch(fetchMedicines(filters));  
  };
  
  const handleSearchChange = (e) => {
    const query = e.target.value;
    dispatch(setSearchQuery(query));

    if (!query.trim()) {
      dispatch(resetFilters()); 
    }
  };
  
  const handleFilter = () => {
    const filters = {
      category: selectedCategory ? selectedCategory.value : undefined, 
      query: searchQuery.trim() || undefined,  
      page: 1,
      limit: 12,
    };
  
    dispatch(fetchMedicines(filters));

  };

  const isMobile = window.innerWidth <= 768;

  const customStyles = {
    control: (base, state) => ({
      ...base,
      boxSizing: 'border-box',
      height: '44px',
      width: isMobile ? '335px' : '214px',
      border: `1px solid ${state.isFocused ? 'var(--green-accent-color)' : 'rgba(29, 30, 33, 0.1)'}`, 
      backgroundColor: '#ffffff',
      borderRadius: '60px',
      padding: '0 6px', 
      boxShadow: '0 0 0 rgba(0, 0, 0, 0.2)',
      '&:hover': {
        borderColor: '#E850501A',
      },
    }),
    menu: (base) => ({
      ...base,
      zIndex: 999,
    }),
    indicatorSeparator: (base) => ({
      ...base,
      display: 'none', 
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isFocused ? '#93939A' : isSelected ? '#93939A' : '#ffffff', 
      color: isSelected ? '#ffffff' : '12141733',
      padding: 10,
      cursor: 'pointer',
    }),
    placeholder: (base) => ({
      ...base,
      color: 'rgba(29, 30, 33, 0.4)', 
      fontSize: '12px',
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: 'rgba(29, 30, 33, 0.7)', 
      '&:hover': {
        color: '#1D1E21', 
        width: '7px',
      },
    }),
  };

  return (
    <section className={style.sectionSearch}>
      <h2 className={style.titleMedicine}>Medicine</h2>
    <form onSubmit={(e) => e.preventDefault()}>

      <div className={style.containerSearchCategory}>
              <Select
                id="categoryFilter"
                value={selectedCategory} 
                onChange={handleCategoryChange}
                options={categoryOption}
                styles={customStyles}
                menuPosition="fixed"
                placeholder="Product category"
              />

      <div className={style.containerSearch}>
          <div className={style.inputWrapper}>
              <svg width={18} height={18} className={style.iconSearch}>
                  <use xlinkHref={`${sprite}#icon-search`} className={style.icon}/>
              </svg>
              <input
                  type="text"
                  id="searchInput"
                  placeholder="Search medicine"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className={style.searchInput}
              />
          </div>
    </div>
    <button 
      type="button"
      onClick={handleFilter} 
      className={style.btnMedicine}>
        <svg width={18} height={18} className={style.iconFilter}>
            <use xlinkHref={`${sprite}#icon-filter`} />
        </svg>
        Filter
    </button>
    </div>
    </form>
    </section>
  )
};

export default MedicineSearch;
