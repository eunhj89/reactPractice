import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dtalk001 from "./Components/Dtalk001";
import Dtalk002 from "./Components/Dtalk002";

function App() {
  return (
    <div className="App" align="center">
      <BrowserRouter>
        <Routes>
          <Route path="/detail/:name" Component={Dtalk002} />
          <Route exact path="/" Component={Dtalk001} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
