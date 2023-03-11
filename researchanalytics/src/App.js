import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HeadNavbar from "./components/HeadNavbar";
import DashboardPage from "./components/DashboardPage";
import AuthorsPage from "./components/AuthorsPage"
import SideNavBar from './components/SideNavBar';


export default function App() {
  return (  
      <BrowserRouter>
        <HeadNavbar />
        <div className="ui grid mt-1" style={{height:"100vh"}}>
          <div className="two wide column">
            <SideNavBar />
          </div>
          <div className="fourteen wide column">
            <Routes>
              <Route exact path="/" element={<DashboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/authors" element={<AuthorsPage />} />
            </Routes>
          </div>
      </div>
      </BrowserRouter>
  );
}