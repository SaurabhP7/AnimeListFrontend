import React, { useState } from 'react'
import BlogApp from './components/BlogApp'
import Users from './components/Users'
import User from './components/User'
import BlogDetails from './components/BlogDetails'
import Login from './components/Login'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { removeUser } from './reducers/userReducer'
import storage from './utils/storage'
import { Container,AppBar,Toolbar,IconButton,Button } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import './App.css'

const theme1 =createTheme({
  palette: {
    primary: {
      main: '#663c53'
    }
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
  MuiCard:{
    root:{
      borderRadius: '10px'
    }
  },
  MuiOutlinedInput:{
    input:{
      padding:'4.5px 7px'
    }
  },
})

const App=() => {

  const user=useSelector(state => state.userDetail)
  const dispatch=useDispatch()
  const [loggedUser,setLoggedUser]=useState(null)
  const [username, setUsername]=useState('')
  const [password,setPassword]=useState('')

  const handleLogout=() => {
    dispatch(removeUser())
    storage.logoutUser()
    setLoggedUser('')
  }

  return(
    <div>
      <Router>
        <ThemeProvider theme={theme1}>
          <div>
            <AppBar position="fixed" color="primary">
              <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">

                </IconButton>
                <Button color="inherit" component={Link} to="/blogs">
                Blogs
                </Button>
                <Button color="inherit" component={Link} to="/users">
                Users
                </Button>
                {loggedUser
                  ? <span>{user.name} <Button color="inherit" onClick={handleLogout}>logout</Button></span>
                  : <Button color="inherit" component={Link} to="/login">Login</Button>
                }
              </Toolbar>
            </AppBar>
          </div>

          <Container>
            <div style={{ marginTop:80 }}>
              <Switch>
                <Route path="/login">
                  <Login setLoggedUser={setLoggedUser} username={username} password={password} setUsername={setUsername} setPassword={setPassword} />
                </Route>
                <Route path="/users/:id">
                  <User />
                </Route>
                <Route path="/users">
                  <Users />
                </Route>
                <Route path="/blogs/:id">
                  <BlogDetails loggedUser={user} />
                </Route>
                <Route path="/blogs">
                  <BlogApp />
                </Route>
                <Route path="/">
                  {user ? <BlogApp /> : <Redirect to="/login" /> }
                </Route>
              </Switch>
            </div>
          </Container>
        </ThemeProvider>
      </Router>
    </div>
  )
}

export default App