import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu as MenuIcon, Close } from '@mui/icons-material';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';

const Url = [
  { Text: "Home", url: "/" },
  { Text: "Games", url: "/Games" },
  { Text: "AI", url: "/Ai" },
  { Text: "Search", url: "/search" },
  { Text: "Movies", url: "/Movies" },
];

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="flex-shrink-0">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            DANA
          </h1>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8">
          {Url.map(({ Text, url }) => (
            <NavLink
              key={url}
              to={url}
              className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400"
            >
              {Text}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <Button
          onClick={toggleDrawer}
          className="md:hidden text-gray-800 dark:text-gray-200"
          aria-expanded={drawerOpen}
          aria-label="Toggle menu"
        >
          {drawerOpen ? (
            <Close className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </Button>

        {/* Mobile Drawer Menu */}
        <Drawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          placement="right"
        >
          <DrawerContent
            className="transition-transform transform-gpu"
            style={{
              transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
              transition: 'transform 0.3s ease-in-out',
            }}
          >
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Menu</DrawerTitle>
                <DrawerDescription>Navigate to different sections.</DrawerDescription>
              </DrawerHeader>
              <div className="flex  flex-col pl-8 space-y-4">
                {Url.map(({ Text, url }) => (
                  <Link
                    key={url}
                    to={url}
                    className="text-xl font-semibold hover:text-gray-600 dark:hover:text-gray-400"
                    onClick={toggleDrawer}
                  >
                    {Text}
                  </Link>
                ))}
              </div>
              <div className="flex justify-between p-4">
                <Button onClick={toggleDrawer}>Close</Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </nav>
    </header>
  );
}

export default Navbar;
