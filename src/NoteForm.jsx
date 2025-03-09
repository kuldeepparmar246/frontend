import { useState } from "react"

const NoteForm = (props) => {
  const [newNote,setNewNote] = useState('')

  const handleNoteSubmit = (event) => {
    event.preventDefault();

    createNote({
      content : newNote,
      important : true
    })

    setNewNote('');
  }


  const { createNote } = props
  return (
    <form onSubmit={handleNoteSubmit}>
      <input onChange={ ({target}) => setNewNote(target.value) } value={newNote}/>
      <button type="submit">save</button>
    </form>
  )
}

export default NoteForm