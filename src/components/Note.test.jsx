import { render,screen } from '@testing-library/react'
import Note from './Note'
import { expect } from 'vitest'
import userEvent from '@testing-library/user-event'


test('render content',() => {
  const note = {
    content : 'Content testing is done using react testing library',
    important : true
  }

  render(<Note note={note} />)

  const element = screen.getByText('Content testing is done using react testing library')

  screen.debug(element)

  expect(element).toBeDefined()
})


test('clicking the button using the mock handler',async () => {
  const note = {
    content : 'Content testing is done using react testing library',
    important : true
  }

  const mockHandler = vi.fn()

  render(<Note note={note} toggleNoteImportance={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('make not important')
  screen.debug(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})

