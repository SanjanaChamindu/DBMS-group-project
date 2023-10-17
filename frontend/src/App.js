import React from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import LoginForm from './components/loginForm';

function App() {
  return (
    <div className="App">
      <div className="App-header">
      <Link to="/dashboard">
        <button>Sidebar</button>
      </Link>
      <Routes>
            <Route path="/login" element={<LoginForm/>} />
            <Route path="/dashboard" element={<Sidebar/>} /> {/*sidebar component*/}
            <Route path="/not-found" element={<h1>Page Not Found</h1>} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/not-found" />} /> {/*navigate to not-found page if no path is specified*/}
        </Routes>                                                     {/*do not need to use Switch component*/}
      </div>
    </div>
  );
}

export default App;
