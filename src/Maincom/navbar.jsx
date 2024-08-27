import * as React from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { Menu as MenuIcon, Close } from '@mui/icons-material';
import { IconButton, Drawer, Box } from '@mui/material';
import { Button } from '@/components/ui/button';
import { SunIcon, MoonIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Avatar } from '@nextui-org/avatar';

const Url = [
  { Text: "Home", url: "/" },
  { Text: "AI", url: "/Ai" },
  { Text: "Movies", url: "/Movies" },
  { Text: "Sport", url: "/Sport" },
  { Text: "SocialMedias", url: "/SocialMedias" },
  { Text: "Apps", url: "/Education" },
  { Text: "Technology", url: "/Technology" },
  { Text: "PlayGame", url: "/Games" },
  { Text: "Search", url: "/search" },
];

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <header className="bg-white dark:bg-slate-950 shadow-md transition-colors">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="flex-shrink-0">
          <h1 className={`text-2xl font-bold transition-colors ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
            DANA
          </h1>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex md:justify-center md:w-full">
          <div className="flex space-x-6">
            {Url.map(({ Text, url }) => (
              <NavLink
                key={url}
                to={url}
                className={`text-gray-800 sm:text-sm dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition-colors`}
              >
                {Text}
              </NavLink>
            ))}
          </div>
        </div>

        <div className=" md:flex items-center">
          {/* Theme Switch for Desktop */}
          <Button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            size="lg"
            color="secondary"
            className={`ml-4 ${theme === "dark" ? "text-white" : "text-black"} hover:opacity-80 transition-opacity duration-300 bg-transparent`}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden flex items-center">
          <IconButton
            onClick={toggleDrawer}
            className="text-gray-800 dark:text-gray-200"
            aria-expanded={drawerOpen}
            aria-label="Toggle menu"
          >
            {drawerOpen ? <Close /> : <MenuIcon />}
          </IconButton>
        </div>

        {/* Mobile Drawer Menu */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            '& .MuiDrawer-paper': {
              width: '55%',
              borderRadius: '20px',
              overflow: 'hidden', // Ensure rounded corners are visible
            },
          }}
        >
          <Box p={4} className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Menu</h2>
              <IconButton onClick={toggleDrawer}>
                <Close />
              </IconButton>
            </div>
            <div className="flex flex-col space-y-4">
              {Url.map(({ Text, url }) => (
                <Link
                  key={url}
                  to={url}
                  className="text-lg font-medium hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                  onClick={toggleDrawer}
                >
                  {Text}
                </Link>
              ))}
              <Avatar showFallback src='https://images.unsplash.com/broken' />
            </div>
          </Box>
        </Drawer>
        
       
        <button
          className='bg-transparent hidden lg:flex items-center'
          onClick={() => navigate("/login")}
        >
          <div className="flex gap-4 items-center">
            <Avatar showFallback src='https://images.unsplash.com/broken' />
          </div>
        </button>
      </nav>
    </header>
  );
}

export { Navbar as default, Url };
