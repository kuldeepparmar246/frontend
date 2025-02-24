
import { useState,useEffect } from "react"
import Note from "./Note";
import noteServices from './services/notes'
import Notification from "./Notification";
import Footer from "./Footer";


const App = () => {
  
  const [notes,setNotes] = useState([]);
  const [newNote,setNewNote] = useState('')
  const [showAll,setShowAll] = useState(true)
  const [errorMessage,setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect')

    noteServices
    .getAll()
    .then(initialNotes => {
      console.log('promise fullfilled')
      setNotes(initialNotes);
    })
    
  },[])

  console.log(`render ${notes.length} notes`)

  const handleSubmit = (event) => {

    event.preventDefault();
    const newNotObj = {
      content : newNote,
      important : Math.random() > 0.5,
    }

    noteServices
    .create(newNotObj)
    .then(returnedNote => {
      console.log(returnedNote)
      setNotes(notes.concat(returnedNote));
      setNewNote('')
    })

  }

  const handleChange = (event) => {
    setNewNote(event.target.value);

  }

  const showNotes = showAll ? notes : notes.filter(note => note.important);


  const handleClick = () => {
    setShowAll(!showAll);
  }

  const toggleNoteImportance = (id) => {
    console.log(`Note id ${id} is Clicked`)

    const note = notes.find(note => note.id == id)
    const changedNote = {...note,important:!note.important}
    
    noteServices
    .update(id,changedNote)
    .then(returnedNote => {
      console.log(returnedNote)
      setNotes(notes.map(n => n.id === id ? returnedNote : n))
    })
    .catch(error => {
      setErrorMessage(
        `the content with content ${note.content} is deleted from server `
      )
      setTimeout(() => {
        setErrorMessage(null)
      },8000)

      setNotes(notes.filter(note => note.id !== id))
    })
  }

  return (
    <div>
      <div>
        <h1>Notes</h1>
        <Notification message={errorMessage} />
        <button onClick={handleClick}>show {showAll ? 'important' : 'all'}</button>
        <ul>
          {showNotes.map((note) => <li key={note.id}>{note.content}</li>)}
        </ul>
        <form onSubmit={handleSubmit}>
          <input onChange={handleChange} value={newNote}/>
          <button type="submit">save</button>
        </form>
      </div>
      <div>
        <ul>
          {notes.map(note => <Note note={note} toggleNoteImportance={() => toggleNoteImportance(note.id)} key={note.id} />)}
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default App
