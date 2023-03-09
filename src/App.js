import "./index.css";
import Sidebar from "./Sidebar";
//import Main from "./Main";
import Header from "./Header";
import Edit from "./Edit";
import React, { createContext } from "react";
import { useState, useEffect } from "react";
import uuid from "react-uuid";
import { BrowserRouter, json, Route, Routes } from "react-router-dom";

function App() {

  const emptyNote = () => {
    return {
      id: uuid(),
      title: "Untitled",
      body: "",
      lastModified: Date.now(),
    };
  };

  
  const [notes, setNotes] = useState(() => {
    const storedNotes = localStorage.getItem("notes");
    let parsedNotes;
    try {
      parsedNotes = JSON.parse(storedNotes);
    } catch (error) {
      console.error("Failed to parse notes from local storage:", error);
      parsedNotes = null;
    }
    return parsedNotes ?? [emptyNote()];
  });

  const [sidebarStatus, setSidebarStatus] = useState(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);


  const onAddNote = () => {
    const newNote = emptyNote();
    setNotes([newNote, ...notes]);
  };

  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <div className="row">
          <Routes>
            <Route exact path="/" element={<Sidebar notes={notes} onAddNote={onAddNote} setNotes={setNotes} />} />
            <Route exact path="/edit/:id" element={<Edit notes={notes} setNotes={setNotes} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
