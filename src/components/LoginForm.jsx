import { useState } from 'react'

const LoginForm = (props) => {
  const { loginUser } = props
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  const handleLoginSubmit = (event) => {
    event.preventDefault()

    loginUser({
      username,
      password
    })

    setPassword('')
    setUsername('')

  }


  return (
    <div>
      <form onSubmit={handleLoginSubmit}>
        <div>
            username
          <input
            data-testid="username"
            name="username"
            type="text"
            value={username}
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
            password
          <input
            data-testid="password"
            name="password"
            value={password}
            type="text"
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit" >login</button>
      </form>
    </div>
  )
}

export default LoginForm