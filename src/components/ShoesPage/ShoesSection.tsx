import { useState } from 'react';

import FilterPhone from './Filter/FilterPhone';
import HeaderShoes from './Filter/HeaderShoes';
import MainFilter from './Filter/MainFilter';
import Products from './Products/Products';
import Slider from './Slider/Slider';

function ShoesSection() {
  const [filterVisible, setFilterVisible] = useState(true);
  const [sortBy, setSortBy] = useState('');
  const [filterType, setFilterType] = useState('');
  const [genderFilter, setGenderFilter] = useState<string | null>(null);
  const [discount, setDiscount] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  return (
    <>
      <Slider />
      <HeaderShoes
        sortBy={sortBy}
        setSortBy={setSortBy}
        filterVisible={filterVisible}
        setFilterVisible={setFilterVisible}
      />
      <FilterPhone
        sortBy={sortBy}
        setSortBy={setSortBy}
        setDiscount={setDiscount}
        genderFilter={genderFilter}
        setGenderFilter={setGenderFilter}
        setFilterType={setFilterType}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
      />
      <div className='flex  sm:p-8 md:gap-10 md:p-10'>
        <div>
          <MainFilter
            setDiscount={setDiscount}
            genderFilter={genderFilter}
            setGenderFilter={setGenderFilter}
            setFilterType={setFilterType}
            filterVisible={filterVisible}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
        </div>
        <Products
          discount={discount}
          genderFilter={genderFilter}
          filterType={filterType}
          sortBy={sortBy}
          selectedSize={selectedSize}
        />
      </div>
    </>
  );
}

export default ShoesSection;
