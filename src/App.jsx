import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import MainLayout from './MainLayout/layout';
import Results from './Google component/result';
import Err from './Maincom/Err';
import Home from './Maincom/Home';
import Games from './Game/Game';
import Ai from './Ai/Ai';
import Movies from './movies/movies'
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="search" element={<Results />} />
       
        <Route path= "Ai"  element={<Ai/>}/>
        <Route path= "Games"  element={<Games/>}/>
        <Route path= "Movies"  element={<Movies/>}/>
        <Route path="*" element={<Err />} />
      </Route>
      </>
    )
  );

  return (
    <RouterProvider router={router} />
  );
}

export default App;
