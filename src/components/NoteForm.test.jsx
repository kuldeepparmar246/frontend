import { render,screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NoteForm from './NoteForm'
import Note from './Note'


test('<NoteForm /> updating the parent and check ',async () => {
  const createNote = vi.fn()
  const user = userEvent.setup()

  render(<NoteForm createNote={createNote}/>)

  const input = screen.getByRole('textbox')
  const saveButton = screen.getByText('save')

  await user.type(input,'testing the form...')
  await user.click(saveButton)

  expect(createNote.mock.calls).toHaveLength(1)
  console.log(createNote.mock.calls)
  expect(createNote.mock.calls[0][0].content).toBe('testing the form...')

})

test('<NoteForm /> updating the parent and check using the placeholder',async () => {
  const createNote = vi.fn()
  const user = userEvent.setup()

  render(<NoteForm createNote={createNote}/>)

  const input = screen.getByPlaceholderText('write note content')
  const saveButton = screen.getByText('save')

  await user.type(input,'testing the form...')
  await user.click(saveButton)

  expect(createNote.mock.calls).toHaveLength(1)
  console.log(createNote.mock.calls)
  expect(createNote.mock.calls[0][0].content).toBe('testing the form...')

})

test('does not render this', () => {
  const note = {
    content: 'This is a reminder',
    important: true
  }

  render(<Note note={note} />)

  const element = screen.queryByText('do not want this thing to be rendered')
  expect(element).toBeNull()
})