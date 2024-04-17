import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //   Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxNTM5NjA1ZTEyNGE3OTQ4MWI0M2ZiIn0sImlhdCI6MTY5NTg5NDk0Nn0.3c4Tj8SGQdanyJ47OFgIARgFAkKhw1fzRmVdly0TTmU"
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json()
    setNotes(notes.concat(note));
  };

  // Get all Notes
  const getNotes = async () => {
    // API call
    // eslint-disable-next-line
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxNTM5NjA1ZTEyNGE3OTQ4MWI0M2ZiIn0sImlhdCI6MTY5NTg5NDk0Nn0.3c4Tj8SGQdanyJ47OFgIARgFAkKhw1fzRmVdly0TTmU"
        },
      });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  };


  // Delete a Note
  const deleteNote = async (id) => {
    // API call
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxNTM5NjA1ZTEyNGE3OTQ4MWI0M2ZiIn0sImlhdCI6MTY5NTg5NDk0Nn0.3c4Tj8SGQdanyJ47OFgIARgFAkKhw1fzRmVdly0TTmU"
        },
      });
      const json = response.json();
      console.log(json)

    console.log("Deleteing the note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };


  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API call
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json)
    // eslint-disable-next-line

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  };
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
