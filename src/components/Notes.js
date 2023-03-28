import React, { useContext,useState, useEffect, useRef } from 'react'
import NoteContext from '../context/notes/NoteContext'
import AddNote from './AddNote'

const Notes = () => {
  const context = useContext(NoteContext)
  const { notes, deleteNote, getNotes, editNote } = context

  useEffect(() => {
    getNotes()
    // eslint-disable-next-line
  }, [])

  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
  }
  const ref = useRef(null)
  const refclose = useRef(null)

  const [note, setNote] = useState({etitle: "", edescription: "", etag: "default"})
  const handleClick = (e)=>{
      console.log('updating the note...', note)
      editNote(note.id, note.etitle, note.edescription, note.etag)
      refclose.current.click()
        e.preventDefault()
  }
  const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
  }

  return (
    <>
      <AddNote />

      <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />

                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag"  value={note.etag} onChange={onChange} minLength={5} required />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.length === 0 && 'No notes to display'}
        {notes.map((note) => {
          return <div className='col-md-3' key={note._id}><div className="card my-3">
            <div className="card-body">
              <h5 className="card-title">{note.title}</h5>
              <p className="card-text">{note.description}</p>
              <i className="far fa-trash-alt mx-2" onClick={() => { deleteNote(note._id) }}></i>
              <i className="far fa-edit mx-2" onClick={() => { updateNote(note) }}></i>
            </div>
          </div>
          </div>
        })}
      </div>
    </>
  )
}

export default Notes
