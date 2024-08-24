import FilterListIcon from '@mui/icons-material/FilterList';

export const DropdownMenu = ({ title, categories, onSelectCategory }) => (
  <div className="relative inline-block text-left">
    <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none">
      <FilterListIcon className="w-5 h-5" /> {/* Using MUI filter icon */}
      <span>{title}</span>
    </button>
    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
      {categories.map((category, index) => (
        <a
          key={index}
          href="#"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
          onClick={(e) => {
            e.preventDefault(); // Prevent default anchor behavior
            onSelectCategory(category);
          }}
        >
          {category}
        </a>
      ))}
    </div>
  </div>
);
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Allsites from '../constant/constant.js';
import Card from './Card.js';
import { DropdownMenu } from './menudrop.jsx';
import { Url } from '../Maincom/navbar.jsx';

function Movies() {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const getCategories = (path) => {
    const items = getDropdownOptions(path);
    const categories = [...new Set(items.map(item => item.category))]; // Unique categories
    return categories;
  };

  const getDropdownOptions = (path) => {
    switch (path) {
      case "/Movies":
        return Allsites.MoviesSites || [];
      case "/Technology":
        return Allsites.Technology || [];
      case "/Education":
        return Allsites.Education || [];
      case "/SocialMedias":
        return Allsites.Social || [];
      case "/Sport":
        return Allsites.Sports || [];
      case "/Programming":
        return Allsites.Programming || [];
      default:
        return [];
    }
  };

  const filterItems = (path, category) => {
    let items = getDropdownOptions(path);
    items = items.filter(item => item.image); // Filter for items with images

    if (category !== 'All') {
      items = items.filter(item => item.category === category);
    }
    
    return items;
  };

  const getRouteName = (path) => {
    const route = Url.find(item => item.url === path);
    return route ? route.Text : 'Unknown';
  };

  const itemsWithImages = filterItems(location.pathname, selectedCategory);
  const categories = getCategories(location.pathname);

  const isDropdownVisible = location.pathname === "/Movies" || location.pathname === "/Technology";

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">{getRouteName(location.pathname)}</h2>
      
      {isDropdownVisible && (
        <DropdownMenu
          title="Filter by Category"
          categories={['All', ...categories]}
          onSelectCategory={setSelectedCategory}
        />
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {itemsWithImages.length > 0 ? (
          itemsWithImages.map((item) => (
            <Card key={item.id} item={item} />
          ))
        ) : (
          <p className="text-center col-span-4">No items found for the selected category.</p>
        )}
      </div>
    </div>
  );
}

export default Movies;
