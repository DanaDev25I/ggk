import { useState } from 'react';
import Allsites from "@/constant/constant";
import MovieCard from "./card"; 

function Technology() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const getCategories = () => {
    const categories = [...new Set(Allsites.Technology.map(item => item.category))];
    return ['All', ...categories];
  };

  const filterItems = (items, category) => {
    if (category === 'All') {
      return items;
    }
    return items.filter(item => item.category === category);
  };

  const categories = getCategories();
  const filteredItems = filterItems(Allsites.Technology, selectedCategory);

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1>Technology</h1>
        <label htmlFor="category-filter" className="block text-lg font-medium">Filter by Category</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="mt-2 p-2 border border-gray-300 rounded"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <MovieCard key={item.url} item={item} />
          ))
        ) : (
          <p className="text-center col-span-full">No items found for the selected category.</p>
        )}
      </div>
    </div>
  );
}

export default Technology;
