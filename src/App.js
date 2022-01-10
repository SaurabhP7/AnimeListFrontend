import React, { useEffect } from 'react'
import BlogApp from './components/BlogApp'
import Users from './components/Users'
import User from './components/User'
import BlogDetails from './components/BlogDetails'
import Login from './components/Login'

import { login,logout } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { initializeBlogs } from './reducers/blogReducer'
import storage from './utils/storage'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { Container, AppBar, Toolbar, Button, Box } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import './App.css'

const theme1=createTheme({
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

  const user=useSelector(state => state.user)
  const dispatch=useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    const user = storage.loadUser()
    if (user) {
      dispatch(login(user))
    }
  }, [dispatch])

  const handleLogout=() => {
    dispatch(logout())
    storage.logoutUser()
  }

  if(!user){
    return(
      <ThemeProvider theme={theme1}>
        <Login />
      </ThemeProvider>
    )
  }

  return(
    <div>
      <Router>
        {console.log('in router')}
        <ThemeProvider theme={theme1}>
          <div>
            <AppBar position="fixed" color="primary">
              <Toolbar>
                <Box sx={{ flexGrow: 0.1 }}>
                  <Button color="inherit" component={Link} to="/">
                Blogs
                  </Button>
                </Box>
                <Box sx={{ flexGrow: 10 }} >
                  <Button color="inherit" component={Link} to="/users">
                Users
                  </Button>
                </Box>
                {user
                  ? <Box sx={{ flexGrow: 0 }}>{user.name} <Button color="inherit" onClick={handleLogout}>logout</Button></Box>
                  : <Box sx={{ flexGrow: 0 }}><Button color="inherit" component={Link} to="/login">Login</Button></Box>
                }
              </Toolbar>
            </AppBar>
          </div>

          <Container>
            <div style={{ marginTop:80 }}>
              <Switch>
                <Route path="/users/:id">
                  <User />
                </Route>
                <Route path="/users">
                  <Users />
                </Route>
                <Route path="/blogs/:id">
                  <BlogDetails />
                </Route>
                <Route path="/">
                  <BlogApp />
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