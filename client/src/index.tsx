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
        </Routes>
      </MainLayout>
    </BrowserRouter>
  </React.StrictMode>
);