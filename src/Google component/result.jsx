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
import { useStateContext } from '../store/usecontext';
import { Pagination } from '@nextui-org/react';
import Footer from './footer';

const links = [
  { text: 'All', component: <All /> },
  { text: 'Images', component: <ImagesTab /> },
];

export const Results = () => {
  const [value, setValue] = useState('1');
  const { theme } = useTheme();
  const { setnumberofpage, err, numberofpage, searchTerm } = useStateContext();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePageChange = (page) => {
    setnumberofpage(page);
  };

  if (err) {
    return (
      <div className="text-center ">
        <h2 className="text-2xl text-red-500">Error</h2>
        <p className="text-lg text-gray-500">This feature is currently under construction.</p>
      </div>
    );
  }

  return (
    <section className="flex flex-col justify-between p-3 mt-10 h-[85vh]">
      {searchTerm ? (
        <>
       
          <div className="w-full flex items-center justify-center p-4 sm:max-w-md mx-auto">
            <Search />
          </div>

          {/* Tabs Component */}
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  '@media(min-width: 768px)': {
                    width: '100%', 
                  },
                }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="tabs"
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                    '@media(min-width: 768px)': {
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                    },
                  }}
                >
                  {links.map(({ text }, index) => (
                    <Tab
                      key={text}
                      label={text}
                      value={(index + 1).toString()}
                      component={NavLink}
                      sx={{
                        fontSize: '16px',
                        flexGrow: 1,
                        textTransform: 'none',
                        fontWeight: value === (index + 1).toString() ? 'bold' : 'normal',
                        color: theme === 'dark' ? 'white' : 'text.primary',
                        '&.Mui-selected': {
                          color: theme === 'dark' ? 'gray' : 'blue',
                        },
                        '&:hover': {
                          color: theme === 'dark' ? 'gray' : 'blue',
                        },
                        padding: '12px',
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
            <div className="grid place-items-center mt-7">
              {/* Pagination Component */}
              <Pagination
                isCompact
                showControls
                total={5}
                initialPage={numberofpage}
                onChange={handlePageChange}
              />
            </div>
          </Box>
        </>
      ) : (
        
        <div className="text-center text-gray-500 mt-20 flex flex-col items-center w-full">
          <h1 className=' mb-10  text-3xl text-[rgb(69,215,203)] font-bold italic'>Search Websites</h1>
          <Search />
        </div>
      )}
      <Footer />
    </section>
  );
};

export default Results;
