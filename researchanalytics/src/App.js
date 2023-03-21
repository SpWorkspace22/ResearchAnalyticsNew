import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HeadNavbar from "./components/HeadNavbar";
import DashboardPage from "./components/DashboardPage";
import AuthorsPage from "./components/AuthorsPage"
import SideNavBar from './components/SideNavBar';
import AuthorUpload from './components/utilityComponents/uploadAuthors';
import ArticlesPage from './components/articlesComponent/articlesPage';


export default function App() {
  return (  
      <BrowserRouter>
        <HeadNavbar />
        {/* <div className="ui grid mt-1" style={{height:"100vh"}}>
          <div className="two wide column border-end shadow">
            <SideNavBar />
          </div>
          <div className="fourteen wide column"> */}
          <div className='mt-2'>
            <Routes>
              <Route exact path="/" element={<DashboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/authors" element={<AuthorsPage />} />
              <Route path="/uploadAuth" element={<AuthorUpload />} />
              <Route path='/article' element={<ArticlesPage />} />
            </Routes>
          </div>
      {/* // </div> */}
      </BrowserRouter>
  );
}