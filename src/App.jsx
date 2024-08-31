import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import MainLayout from './MainLayout/layout';
import Results from './Google component/result';
import Err from './Maincom/Err';
import Home from './Maincom/Home';
import Games from './Game/Game';
import Ai from './Ai/Ai';
import Movies from './page/movies';
import Tech from './page/tech';
import Sport from './page/sport';
import Education from './page/education';
import Social from './page/social';
import Login from './Maincom/login';
import Signin from './Maincom/signin.jsx';
import Profile from './Maincom/profile';
import AvatarUploadStep from './Maincom/avatar.jsx';
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
        <Route path= "Technology"  element={<Tech/>}/>
        <Route path= "Sport"  element={<Sport/>}/>
        <Route path= "Education"  element={<Education/>}/>
        <Route path= "SocialMedias"  element={<Social/>}/>
        <Route path="*" element={<Err />} />
      </Route>
      <Route path="/signup/avatar" element={<AvatarUploadStep />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signin />} />
      <Route path="/pro" element={<Profile />} />
      </>
    )
  );

  return (
    <RouterProvider router={router} />
  );
}

export default App;
