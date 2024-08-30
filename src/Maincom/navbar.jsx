import * as React from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { Close } from '@mui/icons-material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { IconButton, Drawer,  } from '@mui/material';
import { Button } from '@/components/ui/button';
import { SunIcon, MoonIcon, Gamepad2, Bot, Popcorn, LayoutGrid, Search, CodeXml, House } from 'lucide-react';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import PublicIcon from '@mui/icons-material/Public';
import { useTheme } from 'next-themes';
import { Avatar } from '@nextui-org/avatar';
import { useStateContext } from '../store/usecontext';
import LOgo from '../../public/img/world-wide.png';
const Url = [
  { Text: "Home", url: "/", Icon: House },
  { Text: "AI", url: "/Ai", Icon: Bot },
  { Text: "Movies", url: "/Movies", Icon: Popcorn },
  { Text: "Sport", url: "/Sport", Icon: SportsSoccerIcon },
  { Text: "SocialMedias", url: "/SocialMedias", Icon: PublicIcon },
  { Text: "Apps", url: "/Education", Icon: LayoutGrid },
  { Text: "Technology", url: "/Technology", Icon: CodeXml },
  { Text: "PlayGame", url: "/Games", Icon: Gamepad2 },
  { Text: "Search", url: "/search", Icon: Search },
];

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const { user } = useStateContext(); // Get the user from context

 
  const textColor = theme === 'dark' ? 'text-gray-200' : 'text-gray-800';
  const hoverColor = theme === 'dark' ? 'hover:text-[rgb(69,215,203)]' : 'hover:text-[rgb(76,186,177)]';

  return (
    <header className="bg-white dark:bg-slate-950 border-b-[rgb(69,215,203)] border-b-2   shadow-md transition-colors">
      <nav className="container  px-4 flex items-center justify-between p-4 gap-8">
      <Link to="/" className="flex items-center justify-center md:translate-x-[-40px] gap-2">
      <img className="h-10" src={LOgo} alt="Logo" />
             <span className={`font-bold   bg-gradient-to-r from-[#50e9e9] to-${theme === "dark" ? 'white' : 'black'} bg-clip-text text-transparent text-2xl pr-7 italic hover:text-gray-400 font-bold transition-colors`}>
                Webfinder
              </span>
        </Link>

        <div className="hidden md:flex md:justify-center md:w-full">
          <div className="flex space-x-8">
            {Url.map(({ Text, url, Icon }) => (
              <NavLink
                key={url}
                to={url}
                className={({ isActive }) => `flex items-center space-x-2 text-md sm:text-lg ${isActive ? 'text-[rgb(69,215,203)]' : textColor} ${hoverColor} transition-colors duration-150`}
              >
                <Icon size={24} />
                <span>{Text}</span>
              </NavLink>
            ))}
          </div>
        </div>

        <div className='flex gap-3'>
          <div className="md:flex items-center">
            {/* Theme Switch for Desktop */}
            <Button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              size="lg"
              color="secondary"
              className={`ml-4 hidden md:block hover:text-gray-400 transition-all ${theme === "dark" ? "text-white" : "text-black"} hover:opacity-80 transition-opacity duration-300 bg-transparent`}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </Button>
          </div>

          <button
            className='bg-transparent hidden lg:flex items-center'
            onClick={() => navigate("/pro")}
          >
            <div className="flex gap-4 items-center">
              <Avatar
                isBordered
                className="bg-[rgb(51,167,158)] hover:bg-[rgb(51,154,145)] transition-all text-white"
                size="lg"
                showFallback
                src='https://images.unsplash.com/broken'
              />
              {user && <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">{user.username}</span>}
            </div>
          </button>
        </div>

        {/* Mobile Menu and Theme Switch Button */}
        <div className="sm:hidden flex items-center gap-4">
          <IconButton
            onClick={toggleDrawer}
            className="text-gray-800 dark:text-gray-200"
            aria-expanded={drawerOpen}
            aria-label="Toggle menu"
          >
            {drawerOpen ? <Close fontSize="inherit" style={{ fontSize: 40 }} /> : <DragHandleIcon fontSize="inherit" style={{ fontSize: 40 }} />}
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
                width: '80%', // Increased width for better usability on small devices
                borderRadius: '20px',
                overflow: 'hidden',
                backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                color: theme === 'dark' ? '#E5E7EB' : '#111827',
              },
            }}
          >

<div className="flex flex-col h-full ${drawerBgColor} space-y-4">
  <div className="flex justify-between items-center mb-4">
    <IconButton className='dark:text-stone-50' onClick={toggleDrawer}>
      <Close fontSize="inherit" style={{ fontSize: 30 }} /> {/* Reduced icon size */}
    </IconButton>
    <div className="flex items-center ">
      <Button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        size="lg"
        color="secondary"
        className={`ml-auto hover:text-gray-400 transition-all ${theme === "dark" ? "text-white" : "text-black"} hover:opacity-80 transition-opacity duration-300 bg-transparent`}
      >
        {theme === "dark" ? <SunIcon size={20} /> : <MoonIcon size={20} />} {/* Adjust icon size */}
      </Button>
    </div>
  </div>

  <div className="flex justify-center mb-7">
    <div className="w-full text-center mb-4">
      <button
        className='bg-transparent flex items-center mx-auto'
        onClick={() => {
          navigate("/pro");
          toggleDrawer(); 
        }}
      >
        <Avatar
          isBordered
          className="bg-[rgb(51,167,158)] text-white h-[90px] w-[90px] hover:bg-[rgb(69,215,203)] transition-all rounded-full" 
          size="lg"
          showFallback
          src='https://images.unsplash.com/broken'
        />
        {user && <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">{user.username}</span>}
      </button>

      {user && (
        <>
          <h1 className="text-xl font-bold mt-4">Hi, {user.username}!</h1> 
          <Button
            onClick={() => {
              
              toggleDrawer();
            }}
            className="mt-2 bg-red-600 text-white font-bold rounded-md hover:bg-red-700"
          >
            Logout
          </Button>
        </>
      )}
    </div>
  </div>

  <div className="flex flex-col justify-start space-y-2"> 
    {Url.map(({ Text, url, Icon }) => (
      <NavLink
        key={url}
        to={url}
        className={({ isActive }) => `flex items-center space-x-2 p-2 text-base font-medium ${isActive ? 'text-[rgb(69,215,203)]' : textColor} ${hoverColor} transition-color transition-all duration-200`} 
        onClick={toggleDrawer}
      >
        <Icon size={24} /> 
        <span>{Text}</span>
      </NavLink>
    ))}
  </div>
</div>

        </Drawer>
      </nav>
    </header>
  );
}

export { Navbar as default, Url };
