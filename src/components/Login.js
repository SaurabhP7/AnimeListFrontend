import React from 'react'
import Notification from './Notification'

import loginService from '../services/login'
import storage from '../utils/storage'

import { useDispatch } from 'react-redux'
import { setUserDetail } from '../reducers/userReducer'
import { showNotification } from '../reducers/notificationReducer'
import { useHistory } from 'react-router-dom'
import { TextField,Button,Card } from '@mui/material'

const Login = ({ setLoggedUser,username,password,setUsername,setPassword }) => {

  const dispatch=useDispatch()
  const history=useHistory()

  const notifyWith =(message,type='success') => {
    dispatch(showNotification(message,type))
  }

  const handleLogin=async (event) => {

    event.preventDefault()

    try{
      const user=await loginService.login({ username, password })
      dispatch(setUserDetail(user))
      setUsername('')
      setPassword('')
      notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
      setLoggedUser(user.name)
      history.push('/')
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
            <Button className="buttonColor" size="small" variant="contained" type="submit" color="primary">login</Button>

          </div>
        </form>
      </Card>
    </div>
  )
}

export default Login