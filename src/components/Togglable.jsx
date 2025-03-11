import { useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
  const { children, buttonLabel, ref } = props
  const [visible,setVisible] = useState(false)

  const hideWhenVisible = { 'display' : visible ? 'none' : '' }
  const showWhenVisible = { 'display' : visible ? '' : 'none' }

  const toggleVisiblity  = () =>  {
    setVisible(!visible)
  }

  useImperativeHandle(ref,() => {
    return {
      toggleVisiblity
    }
  })

  return (
    <div>
      <div>
        <button style={hideWhenVisible} onClick={() => toggleVisiblity()}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className='toggleContent'>
        {children}
        <button style={showWhenVisible} onClick={() => toggleVisiblity()}>cancel</button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable