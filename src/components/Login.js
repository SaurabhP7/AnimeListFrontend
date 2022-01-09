import React, { useState } from 'react'
import Notification from './Notification'

import loginService from '../services/login'
import storage from '../utils/storage'

import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import { showNotification } from '../reducers/notificationReducer'
import { TextField,Button,Card } from '@mui/material'

const Login = () => {

  const [username,setUsername]=useState('')
  const [password, setPassword]=useState('')

  const dispatch=useDispatch()

  const notifyWith =(message,type='success') => {
    dispatch(showNotification(message,type))
  }

  const handleLogin=async (event) => {

    event.preventDefault()

    try{
      const user=await loginService.login({ username, password })
      setUsername('')
      setPassword('')
      dispatch(login(user))
      notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
    }
    catch(exception){
      notifyWith('wrong username/password','error')
    }

  }

  return(
    <div style={{ marginTop:'20px',justifyContent:'center',display:'flex' }}>
      <Card elevation={6} className="loginCard">
        <h2>Login</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            <TextField
              value={username}
              label="Username"
              variant="standard"
              onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            <TextField
              value={password}
              variant="standard"
              type="password"
              label="Password"
              onChange={({ target }) => setPassword(target.value)} />
          </div>
          <div style={{ marginTop:'30px' }}>
            <Button size="small" variant="contained" type="submit" color="primary">login</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default Login