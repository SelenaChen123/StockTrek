import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './home';
import Stocks from './stocks';
import News from './news';
import Profile from './profile';
import Register from './register';
import Login from './login';

const router = createBrowserRouter([
  // {
  //   path: '/', element: <Home />
  // },
  // {
  //   path: '/stocks', element: <Stocks />
  // },
  // {
  //   path: '/news', element: <News />
  // },
  // {
  //   path: '/profile', element: <Profile />
  // },
  {
    path: '/login', element: <Login />
  },
  {
    path: '/register', element: <Register />
  },
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
