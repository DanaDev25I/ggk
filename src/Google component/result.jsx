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
  const { setnumberofpage, numberofpage, searchTerm, searchhistory } = useStateContext();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePageChange = (page) => {
    setnumberofpage(page);
  };

  return (
    <section className="flex flex-col mt-10 min-h-screen">

      {searchTerm ? (
        <>
          <div className="w-full flex items-center justify-center sm:max-w-md mx-auto">
            <Search />
          </div>

          {/* Tabs Component */}
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                  onChange={handleChange}
                  aria-label="tabs"
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    overflowX: 'auto', // Handle overflow for more tabs
                    whiteSpace: 'nowrap',
                    '@media(min-width: 768px)': { // Change the breakpoint as needed
                      flexWrap: 'nowrap',
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
                        flexGrow: 1, // Ensure tabs grow equally
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
                total={10}  // Set the total number of pages dynamically
                initialPage={numberofpage}
                onChange={handlePageChange}
              />
            </div>
          </Box>
        </>
      ) : (
        <div className="text-center text-gray-500 mt-20 flex flex-col items-center w-full">
          <Search />
        </div>
      )}

      {/* Search History Component */}
      {searchhistory.length > 0 && (
        <div className="mt-10 p-4 border-t border-gray-300 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-2">Search History</h2>
          <ul className="list-disc pl-5">
            {searchhistory.map((term, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300">
                {term}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Footer />
    </section>
  );
};

export default Results;
