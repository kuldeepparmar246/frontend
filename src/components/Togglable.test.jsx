import { render,screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'
import { beforeEach, describe, expect, test } from 'vitest'


describe('<Togglable />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel='show...'>
        <div className='testDiv'>
          Togglable content
        </div>
      </Togglable>
    ).container
  })

  test('render its children',async () => {
    await screen.findAllByText('Togglable content')
  })

  test('at start children are not displayed',() => {
    const div = container.querySelector('.toggleContent')
    screen.debug(div)
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button children should display',async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    screen.debug(button)
    await user.click(button)

    const div = container.querySelector('.toggleContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const closeButton = screen.getByText('cancel')
    await user.click(closeButton)

    const div = container.querySelector('.toggleContent')
    expect(div).toHaveStyle('display: none')
  })


})