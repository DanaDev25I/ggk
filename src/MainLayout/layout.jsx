import { Outlet } from 'react-router-dom';
import Navbar from '../Maincom/navbar'; 

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
