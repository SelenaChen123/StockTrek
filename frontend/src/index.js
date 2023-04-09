import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Stocks from "./Stocks";
import Stock from "./Stock";
import News from "./News";
import Settings from "./Settings";

const router = createBrowserRouter([
  {
    path: "/login", element: <Login />
  },
  {
    path: "/register", element: <Register />
  },
  {
    path: "/", element: <Home />
  },
  {
    path: "/stocks", element: <Stocks />
  },
  {
    path: "/stock/:stockTicker", element: <Stock />
  },
  {
    path: "/news", element: <News />
  },
  {
    path: '/settings', element: <Settings />
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
