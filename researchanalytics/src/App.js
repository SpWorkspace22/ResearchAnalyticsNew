import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HeadNavbar from "./components/HeadNavbar";
import DashboardPage from "./components/DashboardPage";
import AuthorsPage from "./components/AuthorsPage"
import AuthorUpload from './components/utilityComponents/uploadAuthors';
import ArticlesPage from './components/articlesComponent/articlesPage';
import SettingsPage from './components/SettingsPage';
import Login from './components/usersComponent/login';
import Register from './components/usersComponent/register';
import { useEffect } from 'react';
import ResetPassword from './components/usersComponent/forgotPassword';
export default function App() {

  useEffect(()=>{
    localStorage.setItem("status",(localStorage.getItem("status")==='true'? true : false))
    localStorage.setItem("user",localStorage.getItem("user"))
  },[])


  return (  
      <BrowserRouter>
        <HeadNavbar />
          <div className='mt-2'>
            <Routes>
              <Route exact path="/" element={ <DashboardPage />}  />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/authors" element={ <AuthorsPage /> } />
              <Route path="/uploadAuth" element={ <AuthorUpload />} />
              <Route path='/article' element={ <ArticlesPage />} />
              <Route path='/setup' element={ <SettingsPage/> } />
              <Route path='/login' element={ <Login/> } />
              <Route path='/register' element={ <Register/> } />
              <Route path='/resetpassword' element={ <ResetPassword/> } />
            </Routes>
          </div>
      </BrowserRouter>
  );
}