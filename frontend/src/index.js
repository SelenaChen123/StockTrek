import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Home';
import Stocks from './Stocks';
import News from './News';
import Register from './Register';
import Login from './Login';
import Settings from './Settings';

const router = createBrowserRouter([
  {
    path: '/login', element: <Login />
  },
  {
    path: '/register', element: <Register />
  },
  {
    path: '/', element: <Home />
  },
  {
    path: '/settings', element: <Settings />
  }
  // {
  //   path: '/stocks', element: <Stocks />
  // },
  // {
  //   path: '/news', element: <News />
  // }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
