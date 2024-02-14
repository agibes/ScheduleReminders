import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import {Home} from './index';
import './App.css';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
    </Routes>
    </>
  );
}

export default App;
