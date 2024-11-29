import style from './MedicineSearch.module.css';
import { useState } from 'react';
import Select from 'react-select';

function MedicineSearch() {

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const query = form.elements.query.value.trim();
    if (query !== '') {
      onSubmit(query);
    } else {
      toast.error('Please enter a search query!');
    }
    form.reset();
  }

  const customStyles = {
    control: (base) => ({
      ...base,
      border: '1px solid rgba(29, 30, 33, 0.1)',
      backgroundColor: 'ffffff',
      borderRadius: '60px',
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
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
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
  };

  const categoryOption = [
    { value: "Medicine", label: "Medicine" },
    { value: "Heart", label: "Heart" },
    { value: "Head", label: "Head" },
    { value: "Hand", label: "Hand" },
    { value: "Leg", label: "Leg" },
    { value: "Dental Care", label: "Dental Care" },
    { value: "Skin Care", label: "Skin Care" }
  ];
    
  return (
    <form onSubmit={handleSubmit}>
      <div className={style.containerSelectCategory}>
        <Select
          id="categoryFilter"
          value={selectedCategory}
          onChange={handleCategoryChange}
          options={categoryOption}
          styles={customStyles}
          menuPosition="fixed"
        />
      </div>
    </form>
  )
};

export default MedicineSearch;
