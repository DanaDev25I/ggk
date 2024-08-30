import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useState } from 'react';
import Allsites from "@/constant/constant";
import MovieCard from "./card";
import backgroundImage from "../../public/img/CODE.jpg";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

function Technology() {
  // Set the default selected category to 'Filter' to show all items initially
  const [selectedCategory, setSelectedCategory] = useState('Filter');

  const getCategories = () => {
    const categories = [...new Set(Allsites.Technology.map(item => item.category))];
    return ['Filter', ...categories];
  };

  const filterItems = (items, category) => {
    // Return all items if 'Filter' is selected
    if (category === 'Filter') {
      return items;
    }
    return items.filter(item => item.category === category);
  };

  const categories = getCategories();
  const filteredItems = filterItems(Allsites.Technology, selectedCategory);

  return (
    <div className="relative">
      <section className="relative h-[200px] sm:h-[300px] lg:h-[600px] border-[rgb(69,215,203)] border-2">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            className="w-full h-full object-cover"
            alt="Technology Background"
          />
        </div>
        {/* Overlay Content */}
        <div className="relative border border-[rgb(69,215,203)] shadow-lg z-10 h-[637px] flex flex-col justify-between p-12 bg-gradient-to-b from-transparent to-black bg-opacity-90">
          <div className="flex items-center justify-evenly h-[80px] sm:h-[100px] lg:h-[120px]">
            <div className="md:border-b-[7px] border-b-5 translate-x-[-20px] translate-y-[-60px] md:translate-x-[-270px] md:translate-y-[-40px] md:p-4 border-[rgb(69,215,203)] py-2 rounded-xl md:rounded-full">
              <h1 className="text-white md:text-4xl font-bold">Technology</h1>
            </div>

            <div className="flex items-center">
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    className="capitalize border-2 md:border-3 md:font-bold md:text-xl md:text-[20px] p-[10px] md:p-[25px] border-[rgb(69,215,203)] translate-x-[70px] translate-y-[-40px] md:translate-x-[240px] md:translate-y-[-20px] flex items-center gap-2" // Added flex and gap
                    bordered
                    color="primary"
                  >
                    <FilterAltIcon /> 
                    {selectedCategory}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Category Filter"
                  onAction={(key) => setSelectedCategory(key)}
                  color="primary"
                  variant="flat"
                  className=" border-b-1 p-3 md:text-lg text-[rgb(69,215,203)]"
                >
                  {categories.map((category) => (
                    <DropdownItem key={category} value={category}>
                      {category}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </section>

      <div className="relative bottom-10 md:bottom-16 border-b-0 z-20 grid border-t-0 p-6 grid-cols-2 gap-4 sm:grid-cols-2 border-[rgb(69,215,203)] border-3 lg:grid-cols-4 bg-gradient-to-b from-black via-white to-white dark:bg-gradient-to-t dark:from-black dark:to-black">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.url} className="relative w-[185px] h-[225px] md:h-[342px] md:w-[450px] border-3 p-0 m-0 rounded-2xl border-[rgb(69,215,203)]">
              <MovieCard item={item} />
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No items found for the selected category.</p>
        )}
      </div>
    </div>
  );
}

export default Technology;
