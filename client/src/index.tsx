import React from 'react';
import ReactDOM from 'react-dom/client';
import { MainLayout } from './components/MainLayout';
import './index.css';
import Home from './pages/Home';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/signup" element={ <SignUp /> } />
          <Route
            path="*"
            element={
              <NotFound />
            }
          />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  </React.StrictMode>
);