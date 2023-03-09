import "./index.css";
import Sidebar from "./Sidebar";
//import Main from "./Main";
import Header from "./Header";
import Edit from "./Edit";
import React, { createContext } from "react";
import { useState } from "react";
import uuid from "react-uuid";
import { BrowserRouter, Route, Routes } from "react-router-dom";



function App() {
  const [notes, setNotes] = useState([]);
  const [sidebarStatus, setSidebarStatus] = useState(null);
  

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled",
      body: "",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
  }

  return (
  <BrowserRouter>
    <div className="container">
      <Header />
      <div className="row">
        <Routes>
          <Route exact path="/" element={<Sidebar notes={notes} onAddNote={onAddNote} setNotes={setNotes}/>} />
          <Route exact path="/edit/:id" element={<Edit notes={notes} setNotes={setNotes}/>} />
        </Routes>
      </div>
    </div>
  </BrowserRouter>);


}
export default App;