import { useImperativeHandle, useState } from "react"

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
      <div style={showWhenVisible}>
        {children}
        <button style={showWhenVisible} onClick={() => toggleVisiblity()}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable