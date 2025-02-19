import { createElement, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HomePage from './App'
import Chat from './Chat/chatMain'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate
} from "react-router-dom";  

const PrivateRoute = ({element}) => {
  // Verifica se o token está no localStorage
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return isAuthenticated ? element : <Navigate to="/" />;
};

const router = createBrowserRouter([
  {
    path:'/',
    element: <HomePage/>
  },
  {
    path: "/Chat/:idusuario",
    element: <PrivateRoute element={<Chat/>}/>
  }
]);

createRoot(document.getElementById('A')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);


