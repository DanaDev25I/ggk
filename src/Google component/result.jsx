import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useTheme } from 'next-themes';
import Search from './search';  // Ensure the correct import path
import All from './tabs/All';
import ImagesTab from './tabs/Images';
import Footer from './Footer';
const links = [
  { text: 'All', component: <All /> },
  { text: 'Images', component: <ImagesTab /> },
];

export const Results = () => {
  const [value, setValue] = useState('1');
  const { theme } = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="mt-4 px-4 sm:px-0">
      {/* Search Component */}
      <div className="w-full flex items-center justify-center sm:max-w-md mx-auto mb-4">
        <Search />
      </div>
      
      {/* Tabs Component */}
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="tabs" sx={{ display: 'flex', flexWrap: 'wrap' }}>
              {links.map(({ text }, index) => (
                <Tab
                  key={text}
                  label={text}
                  value={(index + 1).toString()}
                  component={NavLink}
                  sx={{
                    fontSize: '16px',
                    textTransform: 'none',
                    fontWeight: value === (index + 1).toString() ? 'bold' : 'normal',
                    color: theme === 'dark' ? 'white' : 'text.primary',
                    '&.Mui-selected': {
                      color: theme === 'dark' ? 'gray' : 'blue',
                    },
                    '&:hover': {
                      color: theme === 'dark' ? 'gray' : 'blue',
                    },
                    padding: '12px 16px', // Adjust padding for better touch targets
                  }}
                />
              ))}
            </TabList>
          </Box>
          {links.map(({ component }, index) => (
            <TabPanel key={index} value={(index + 1).toString()} sx={{ padding: 0 }}>
              {component}
            </TabPanel>
          ))}
        </TabContext>
      </Box>
      <Footer/>
    </div>
  );
};

export default Results;
