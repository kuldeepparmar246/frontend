import { useState,useEffect, useRef } from 'react'
import Note from './components/Note'
import noteServices from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'


const App = () => {

  const noteFormRef = useRef()
  const [notes,setNotes] = useState([])
  const [showAll,setShowAll] = useState(true)
  const [errorMessage,setErrorMessage] = useState(null)
  const [user,setUser] = useState(null)

  useEffect(() => {
    console.log('effect')

    noteServices
      .getAll()
      .then(initialNotes => {
        console.log('promise fullfilled')
        setNotes(initialNotes)
      })
  },[])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteServices.setToken(user.token)
    }
  },[])

  console.log(`render ${notes.length} notes`)

  const addNote = async (noteObject) => {

    try {
      const returnedNote = await noteServices.create(noteObject)
      noteFormRef.current.toggleVisiblity()
      console.log(returnedNote)
      setNotes(notes.concat(returnedNote))
    } catch(error) {
      console.error('Error while Adding new Note',error)
    }

  }

  const showNotes = showAll ? notes : notes.filter(note => note.important)


  const handleClick = () => {
    setShowAll(!showAll)
  }

  const toggleNoteImportance = (id) => {
    console.log(`Note id ${id} is Clicked`)

    const note = notes.find(note => note.id === id)
    const changedNote = {...note,important:!note.important}
    noteServices
      .update(id,changedNote)
      .then(returnedNote => {
        console.log(returnedNote)
        setNotes(notes.map(n => n.id === id ? returnedNote : n))
      })
      .catch(() => {
        setErrorMessage(
          `the content with content ${note.content} is deleted from server `
        )
        setTimeout(() => {
          setErrorMessage(null)
        },8000)

        setNotes(notes.filter(note => note.id !== id))
      })
  }

  const handleLoginSubmit = async (userObject) => {
    console.log(`username : ${userObject.username} password : ${userObject.password}`)

    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem('loggedNoteappUser',JSON.stringify(user))
      noteServices.setToken(user.token)
      setUser(user)
      setErrorMessage('Login Succesfull')
      setTimeout(() => setErrorMessage(null),5000)
    } catch (exception) {
      console.log(exception)
      setErrorMessage('Wrong credentials')
      setTimeout(() => setErrorMessage(null),5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    noteServices.setToken('')
    setUser(null)
    setErrorMessage('Logged out successfull')
    setTimeout(() => setErrorMessage(null),5000)
  }

  return (
    <div>
      <div>
        <h1>Notes</h1>
        <Notification message={errorMessage} />

        {user === null
          ? <Togglable buttonLabel="login" >
            <LoginForm loginUser={handleLoginSubmit} />
          </Togglable>
          : <div>
            <div>
              <p>{user.username} logged-in</p>
              <button onClick={handleLogout}>logout</button>
            </div>
            <Togglable buttonLabel="new note" ref={noteFormRef}>
              <NoteForm createNote={addNote} />
            </Togglable>
          </div>
        }

        <button onClick={handleClick}>show {showAll ? 'important' : 'all'}</button>
        <ul>
          {showNotes.map((note) => <li key={note.id}>{note.content}</li>)}
        </ul>
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