import { useState } from 'react'

const NoteForm = (props) => {
  const { createNote } = props
  const [newNote,setNewNote] = useState('')

  const handleNoteSubmit = (event) => {
    event.preventDefault()

    createNote({
      content : newNote,
      important : true
    })

    setNewNote('')
  }

  return (
    <form onSubmit={handleNoteSubmit}>
      <input onChange={ ({target}) => setNewNote(target.value) } value={newNote}
      placeholder='write note content'/>
      <button type="submit">save</button>
    </form>
  )
}

export default NoteForm