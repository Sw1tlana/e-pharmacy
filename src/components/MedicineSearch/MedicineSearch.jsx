import style from './MedicineSearch.module.css';
import { useState } from 'react';
import Select from 'react-select';
import { icons as sprite } from '../../shared/icons';

function MedicineSearch() {

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categoryOption = [
    { value: "Medicine", label: "Medicine" },
    { value: "Heart", label: "Heart" },
    { value: "Head", label: "Head" },
    { value: "Hand", label: "Hand" },
    { value: "Leg", label: "Leg" },
    { value: "Dental Care", label: "Dental Care" },
    { value: "Skin Care", label: "Skin Care" }
  ];
    

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // логіку для фільтрації
  };

  const filteredCategories = categoryOption.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const customStyles = {
    control: (base) => ({
      ...base,
      boxSizing: 'border-box',
      border: '1px solid rgba(29, 30, 33, 0.1)',
      backgroundColor: '#ffffff',
      borderRadius: '60px',
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
      backgroundColor: isFocused ? '#ffffff' : isSelected ? '#93939A' : '#ffffff',  // зміна кольору фону
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
        color: 'rgba(29, 30, 33, 1)', 
        width: '7px',
      },
    }),
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
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
      <input
          type="text"
          id="searchInput"
          placeholder="Search medicine"
          value={searchQuery}  
          onChange={handleSearchChange}   
          className={style.searchInput}   
      />
        <svg width={28} height={24} className={style.iconSearch}>
            <use xlinkHref={`${sprite}#icon-search`} />
        </svg>
    </div>
    </div>
    </form>
    </section>
  )
};

export default MedicineSearch;
