import { useEffect, useState } from 'react'
import { v4 as uid } from "uuid"
import { BsFillArrowDownSquareFill, BsPencilFill, BsPlusCircleFill, BsTrash3Fill } from "react-icons/bs"
import { TiTick } from "react-icons/ti"

import './App.css'

function App() {

    useEffect(() => {
    const local = localStorage.getItem("local-notes")
    const lnotes = JSON.parse(local)

    if (!lnotes) {
      return 0;
    } else {
      setNotes(lnotes)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("local-notes", JSON.stringify(notes))
  })

  // take input as a string //
  const [input, setInput] = useState("")

  // save the inputs in a array //
  const [notes, setNotes] = useState([])

  // save the text id to be edited  //
  const [edit, setEdit] = useState(null)

  // take the edited value as a string //
  const [edittext, setEditText] = useState("")

  // adding items to notes state hook //
  const submit = (e) => {
    e.preventDefault();

    const notelist = {         // objects schema //
      id: uid(),
      text: input,
    }
    if (!input) {
      return 0;
    } else {
      setNotes([...notes].concat(notelist))   // make the copy of the empty array and put the data in it //
      setInput("")
    }
  }

  const deleteNote = (id) => {
    const updatedNotes = [...notes].filter((note) => note.id !== id)   // delete condition //
    setNotes(updatedNotes)
  }

  const editNote = (id) => {
    const afterEdit = [...notes].map((edit) => {        // copy the notes and take the edited text and put it in edit hook //
      if (edit.id === id) {
        edit.text = edittext
      }
      return edit
    })
    setNotes(afterEdit)      // set the notes to the modified data from edit hook //
    setEdit(null)
    setEditText("")
  }

  return (
    <>
      <div className="container">
        <div className="header">
          <h1>Notes</h1>
          <h3>Add Notes Here</h3> <i><BsFillArrowDownSquareFill id='down-arrow' /></i>
        </div>
        <div className="add-notes">
          <form onSubmit={submit}>
            <div className="note">
              <textarea required cols="22" rows="3"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button id='submit' type='submit'><BsPlusCircleFill /></button>
            </div>
          </form>
        </div>
        { notes.length === 0 ? (<h3 className='no-val'>No records are available</h3>) :
        <div className="list">
          {notes.map((items) => {
            return (
              <div className='items' key={items.id}>
                {edit === items.id ?
                  (<textarea className='edit-input'
                    defaultValue={items.text}
                    onChange={(e) => setEditText(e.target.value)} />)
                  : (<textarea readOnly className='notes-text' value={items.text} />)
                }

                <div>
                  {edit === items.id ? (null) : (<button id='btn-trash'
                    onClick={() => deleteNote(items.id)}>
                    <BsTrash3Fill />
                  </button>)}
                </div>

                <div>
                  {edit === items.id ?
                    (<button id='edit-btn-trash'
                      onClick={() => deleteNote(items.id)}>
                      <BsTrash3Fill />
                    </button>) :
                    (null)}
                </div>

                {edit === items.id ?
                  (<button id='edit-btn'
                    onClick={() => editNote(items.id)}>
                    <TiTick /></button>) :
                  (<button className='pencil-btn'
                    onClick={() => setEdit(items.id)}>
                    <BsPencilFill />
                  </button>)}

              </div>
            )
          })}
        </div>}
        <div className="rem-div"><button onClick={() => setNotes([])} className='rem-all'>Clear All</button>
        </div>
      </div>
    </>
  )
}

export default App
