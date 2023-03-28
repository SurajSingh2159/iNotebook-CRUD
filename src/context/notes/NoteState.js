import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = ({children})=>{
  const host = "http://localhost:5000"
      const notesInitial = []
          const [notes, setNotes] = useState(notesInitial)

          //Get all notes
          const getNotes = async()=>{
            //Todo: api call

            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
              method: 'GET',
              headers: {
                'content-type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwMWE2M2Q3ZTNlNjNmNjY1YmNmMzc4In0sImlhdCI6MTY3Nzg0MDIyMX0.mzrPPRPnDpWzAhh7vqBFanAoWyvSoYnEnKMMwota3yE'
              },
            });
            const json = await response.json()
            console.log(json)
            setNotes(json)
          }

          const addNote = async(title, description, tag)=>{
            //Todo: api call

            const response = await fetch(`${host}/api/notes/addnote`, {
              method: 'POST',
              headers: {
                'content-type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwMWE2M2Q3ZTNlNjNmNjY1YmNmMzc4In0sImlhdCI6MTY3Nzg0MDIyMX0.mzrPPRPnDpWzAhh7vqBFanAoWyvSoYnEnKMMwota3yE'
              },
              body: JSON.stringify({title, description,tag})
            });

            const json = response.json()
            console.log(json)

           const note= {
              "_id": "640993ehhaa9972e3146b5a332",
              "user": "6401a63d7e3e63f665bcf378",
              "title": title,
              "description": description,
              "tag": tag,
              "date": "2023-03-09T08:08:10.957Z",
              "__v": 0
            }
            setNotes(notes.concat(note))
          }

          const editNote = async (id, title, description, tag)=>{
            //Api call
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
              method: 'PUT',
              headers: {
                'content-type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwMWE2M2Q3ZTNlNjNmNjY1YmNmMzc4In0sImlhdCI6MTY3Nzg0MDIyMX0.mzrPPRPnDpWzAhh7vqBFanAoWyvSoYnEnKMMwota3yE'
              },
              body: JSON.stringify({title, description,tag})
            });
            const json = response.json();
            console.log(json)

            let newNotes = JSON.parse(JSON.stringify(notes))
            //Logic to edit in client
            for (let index = 0; index < newNotes.length; index++) {
              const element = newNotes[index];
              if(element._id === id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
              }
            }
            setNotes(newNotes)
          }

          const deleteNote = async (id)=>{
            //Todo: Api call
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
              method: 'DELETE',
              headers: {
                'content-type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwMWE2M2Q3ZTNlNjNmNjY1YmNmMzc4In0sImlhdCI6MTY3Nzg0MDIyMX0.mzrPPRPnDpWzAhh7vqBFanAoWyvSoYnEnKMMwota3yE'
              },
            }); 
            const json = response.json();
            console.log(json)

            console.log("Deleting the note with id" + id);
            const newNotes = notes.filter((note)=>{return note._id!==id})
            setNotes(newNotes)

          }

      return(
            <NoteContext.Provider value ={{notes, setNotes, addNote, editNote, deleteNote, getNotes}}>
                  {children}
            </NoteContext.Provider>
      )

}

export default NoteState