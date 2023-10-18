import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar";
//import LoginForm from './components/loginForm';
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./context/authContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
//Histrory object is created by BrowserRouter
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <StrictMode>
        <Sidebar />
      </StrictMode>
    </AuthContextProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/*used packages

1) npm i bootstrap
2) npm install react-router-dom
3) npm i react-router-dom
4) npm i joi-browser
5) npm i framer-motion
6) npm i react-icons
7) npm i styled-components
*/
