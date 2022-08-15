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
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import { authStore } from './stores/authStore';
import { ProtectedRoute } from './components/ProtectedRoute';
import Contacts from './pages/Contacts';
import { NotificationsProvider } from '@mantine/notifications';

authStore.initApp()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NotificationsProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="contacts" element={
              <ProtectedRoute>
                <Contacts />
              </ProtectedRoute>
            } />
            <Route
              path="*"
              element={
                <NotFound />
              }
            />
          </Routes>
        </MainLayout>
      </NotificationsProvider>
    </BrowserRouter>
  </React.StrictMode>
);