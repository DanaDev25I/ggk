import { MovieSites } from '@/constant/constant';
import { Switch, Button } from '@nextui-org/react';
import { SunIcon, MoonIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Card, CardHeader, CardFooter, Image } from '@nextui-org/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";

function Home() {
  const { theme, setTheme } = useTheme();
  const [copiedUrl, setCopiedUrl] = useState(null);
  const [category, setCategory] = useState("All");

  const handleThemeChange = (isSelected) => {
    setTheme(isSelected ? 'dark' : 'light');
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000); // Reset after 2 seconds
    });
  };

  // Combine and filter all MovieSites arrays for items with images
  const allSitesWithImages = [
    ...MovieSites.Sites,
    ...MovieSites.ArabicSites,
    ...MovieSites.English,
    ...MovieSites.Sports,
    ...MovieSites.Programming,
    ...MovieSites.Education,
    ...MovieSites.Social
  ].filter(item => item.image); 

  const filteredItems = category === 'All'
    ? allSitesWithImages
    : allSitesWithImages.filter(item => item.category === category);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        {/* Category Dropdown */}
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered" color="primary">
              {category === 'All' ? 'All Categories' : category}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            onAction={(key) => setCategory(key)}
          >
            <DropdownItem key="All">All</DropdownItem>
            <DropdownItem key="Kurdish">Kurdish Subtitle</DropdownItem>
            <DropdownItem key="Arabic">Arabic Subtitle</DropdownItem>
            <DropdownItem key="English">English Subtitle</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        {/* Theme Switch */}
        <Switch
          defaultSelected={theme === 'dark'}
          size="lg"
          color="secondary"
          startContent={<SunIcon />}
          endContent={<MoonIcon />}
          onChange={(e) => handleThemeChange(e.target.checked)}
          className="ml-4"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {filteredItems.map((item) => (
          <Card key={item.url} isFooterBlurred className="w-full h-[300px] bg-transparent border-none shadow-lg">
            <div className="relative w-full h-full overflow-hidden">
              <Link to={item.url}>
                <Image
                  removeWrapper
                  alt={item.name}
                  className="w-full h-full bg-gradient-to-bl from-blue-500 via-teal-200 to-purple-400 object-scale-down transition-transform duration-300 ease-in-out transform hover:scale-110"
                  src={item.image}
                />
              </Link>
              <CardHeader className="absolute top-2 left-2 z-10">
                <h4 className="text-black font-medium text-lg">{item.name}</h4>
              </CardHeader>
            </div>
            <CardFooter className="absolute blur-8 bottom-0 border-t-1 border-zinc-100/50 z-10 p-2 flex justify-between items-center">
              <div>
                <p className="text-white text-tiny">Available soon.</p>
                <p className="text-black text-tiny">Get notified.</p>
              </div>
              <Button
                size="sm"
                onClick={() => handleCopy(item.url)}
                color={copiedUrl === item.url ? 'success' : 'primary'}
              >
                {copiedUrl === item.url ? 'Copied!' : 'Copy Link'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Home;
