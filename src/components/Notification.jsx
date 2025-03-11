const Notification = (props) => {
  const {message} = props
  if(message === null){
    return
  }

  return (
    <div className="errorMessage">
      {message}
    </div>
  )
}

export default Notification