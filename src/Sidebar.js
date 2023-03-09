import "./index.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Sidebar({ notes, onAddNote, setNotes }){

    const navigate = useNavigate();

    const [content, setContent] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [date, setDate] = React.useState('');
    
    const [selectedNote, setSelectedNote] = useState(() => {
      const storedSelectedNote = localStorage.getItem("selectedNote");
      return storedSelectedNote ? JSON.parse(storedSelectedNote) : null;
    });
    
    const [currentNote, setCurrentNote] = useState(null);

    useEffect(() => {
      localStorage.setItem("selectedNote", JSON.stringify(selectedNote));
    }, [selectedNote]);

    
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
        if(selectedNote) {
          const updatedNote = {
            ...selectedNote,
            body: value,
            lastModified: Date.now(),
          };
          setNotes((prevNotes) => 
          prevNotes.map((note) => (note.id === selectedNote.id ? updatedNote : note))
          );
        }
    }

    function changeTitle(event){
      setTitle(event.target.value);
      if (selectedNote) {
        const updatedNotes = {
          ...selectedNote,
          title: event.target.value,
          lastModified: Date.now(),
        };
        setNotes((prevNotes) =>
          prevNotes.map((note) => (note.id ===selectedNote.id ? updatedNotes : note)));
          
      }
    }

    function removePTags(text) {
      return text.replace(/<p>/g, '').replace(/<\/p>/g, '');
    }

    function changeDate(event){
        setDate(event.target.value);
    }

    const handleEdit = () => {
        navigate(`/edit/${selectedNote.id}`);
    }

    function onNoteClick(note){
      const titleWithoutPTags = note.title.replace(/<p>/g, '').replace(/<\/p>/g, '');
      const bodyWithoutPTags = note.body ? note.body.replace(/<p>/g, '').replace(/<\/p>/g, '') : '';
    
        setSelectedNote(note);
        setTitle(titleWithoutPTags);
        setContent(bodyWithoutPTags);
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
                  <div>{note.body && note.body.replace(/<p>/g, '').replace(/<\/p>/g, '').substr(0, 30) + "..."}</div>
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
                  {removePTags(content)}
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