import React, { useState } from 'react'
import BlogForm from './BlogForm'
import { Button } from '@mui/material'

const Togglable=({ createBlog }) => {

  const [visibile,setVisible]=useState(false)

  const hideWhenVisible={ display:visibile?'none':'' }
  const showWhenVisible={ display:visibile?'':'none' }

  const toggleVisibilty=() => {
    setVisible(!visibile)
  }

  return(
    <div>
      <div style={hideWhenVisible}>
        <Button size="small" variant="outlined" color="primary" onClick={toggleVisibilty}>create new blog</Button>
      </div>

      <div style={showWhenVisible}>
        <BlogForm createBlog={createBlog} toggle={setVisible} />
      </div>
    </div>
  )
}

export default Togglable