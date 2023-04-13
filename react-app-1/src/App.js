import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Delivery01 from "./Components/Delivery01";
import Delivery02 from "./Components/Delivery02";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/test" Component={() => <Navigate to="/" />} />
          <Route path="/detail/:id" Component={Delivery02} />
          <Route exact path="/" Component={Delivery01} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
