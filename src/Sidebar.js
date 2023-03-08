import "./index.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Sidebar({ notes, onAddNote, setNotes }){

    const navigate = useNavigate();

    const [content, setContent] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [date, setDate] = React.useState('');
    const [selectedNote, setSelectedNote] = useState(null);

    function onRemoveNote(id){
      if (window.confirm("Are you sure you want to delete this note?")){
          if (selectedNote && selectedNote.id ===id){
              setSelectedNote(null);
          } 
          setNotes(notes.filter((note) => note.id !== id));
          navigate("/");
      }
    }

    function handleChange(value){
        setContent(value);
    }

    function changeTitle(event){
        setTitle(event.target.value);
    }

    function changeDate(event){
        setDate(event.target.value);
    }

    const handleEdit = () => {
        navigate("/edit/:id");
    }

    function onNoteClick(note){
        setSelectedNote(note);
        setTitle(note.title);
        setContent(note.body);
        setDate(note.lastModified);
    }

    return (
        <>
          <div className="side-bar-lotion">
            <div className="side-bar-header">
              <h1>Notes</h1>
              <button onClick={onAddNote}>&#43;</button>
            </div>
    
            <div className="side-bar-notes">
              {notes.map((note) => (
                <div
                  className={"note-previews"}
                  key={note.id}
                  onClick={() => onNoteClick(note)}
                >
                  <div className="side-bar-note-title">
                    <strong>{note.title}</strong>
                  </div>
                  <p>{note.body && note.body.substr(0, 100) + "..."}</p>
                  <small className="note-meta">
                    Last modified{" "}
                    {new Date(note.lastModified).toLocaleDateString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </small>
                </div>
              ))}
            </div>
          </div>


          <div className="app-main">
            {selectedNote ? (
              <>
                <div className="main-div-one">
                  <input
                    type="text"
                    id="title"
                    placeholder="Untitled"
                    value={title}
                    onChange={changeTitle}
                    autoFocus
                  />
    
                  <div className="note-save-delete">
                    <button onClick={()=> onRemoveNote(selectedNote.id)}>
                      <strong>Delete</strong>
                    </button>
                    <button onClick={handleEdit}>
                      <strong>Edit</strong>
                    </button>
                  </div>
                </div>
    
                <div className="date">
                  <input
                    type="datetime-local"
                    id="date"
                    value={date}
                    onChange={changeDate}
                  />
                </div>
                <div className="text-area">
                  <p>{content}</p>
                </div>
              </>
            ) : (
              <div className="no-note-selected">
                <h2>No note selected</h2>
                <p>Select a note to view its content</p>
              </div>
            )}
          </div>
        </>
      );
    }
    
    export default Sidebar;