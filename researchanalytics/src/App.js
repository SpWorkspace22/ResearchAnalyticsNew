import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HeadNavbar from "./components/HeadNavbar";
import DashboardPage from "./components/DashboardPage";
import AuthorsPage from "./components/AuthorsPage"


export default function App() {
  return (  
      <BrowserRouter>
        <HeadNavbar />
        <Routes>
          <Route exact path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/authors" element={<AuthorsPage />} />
        </Routes>
      </BrowserRouter>
  );
}