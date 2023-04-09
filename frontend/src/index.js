import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Home';
import Stocks from './Stocks';
import News from './News';
import Profile from './Profile';
import Register from './Register';
import Login from './Login';

const router = createBrowserRouter([
  {
    path: '/login', element: <Login />
  },
  {
    path: '/register', element: <Register />
  },
  {
    path: '/', element: <Home />
  }
  // {
  //   path: '/stocks', element: <Stocks />
  // },
  // {
  //   path: '/news', element: <News />
  // },
  // {
  //   path: '/profile', element: <Profile />
  // },
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
