import "./index.css";
import React, { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from "react-router-dom";

function Edit({ notes, setNotes, currentNote }){


    const { id } = useParams();
    const navigate = useNavigate();

    const [content, setContent] = useState(currentNote?.body || '');
    const [title, setTitle] = useState(currentNote?.title || '');
    const [date, setDate] = useState(currentNote?.lastModified || '');

    function onRemoveNote(){
        if (window.confirm("Are you sure you want to delete this note?")){
            const updateNotes = notes.filter((note) => note.id !== id);
            setNotes(updateNotes);
            navigate("/");
        }
      }

    useEffect(() => {
        const selectedNote = notes.find((note) => note.id ===id);
        if (selectedNote) {
            setTitle(selectedNote.title);
            setContent(selectedNote.body);
            setDate(selectedNote.lastModified);
        } else {
            navigate("/");
        }
    }, [id, notes, navigate]);
      

    function handleChange(value){
        setContent(value);
    }

    function changeTitle(event){
        setTitle(event.target.value);
    }

    function changeDate(event){
        setDate(event.target.value);
    }

    function handleSave(){
        const updatedNotes = notes.map((note) =>
            note.id === id ? {...note, title, body:content, lastModified: new Date().toISOString()} : note);
        setNotes(updatedNotes);
        navigate("/");
    }

    

    
    return <div className="app-main">

            <div className="main-div-one">
                <input type="text" id="title" placeholder="Untitled" value={title} onChange={changeTitle} autoFocus/>

                <div className="note-save-delete">
                    <button onClick={onRemoveNote} ><strong>Delete</strong></button>
                    <button onClick={handleSave}><strong>Save</strong></button>
                </div>
            </div>     
            <div className="date">
            <input type="datetime-local" id="date" value={date} onChange={changeDate} />
            </div>
            <div className="text-area">
                    <ReactQuill value={content} onChange={handleChange}   />  
            </div>
    </div>
}
export default Edit;

 //className="text-editor"

/*const handleSave = () => {
        const note = {
            id,
            title: "Untitled",
            body: "",
            lastModified: Date.now(),
        };
        const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];
        const updatedNotes = existingNotes.map((n) => (n.id === id ? note : n));
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
        navigate("/");
    }*/


/*useEffect(() => {
      const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];
      const note = existingNotes.find((note) => note.id === id);
      if (note) {
        setTitle(note.title);
        setContent(note.body);
        setDate(note.lastModified);
      } else {
        navigate("/");
      }
    }, [id, navigate]); */