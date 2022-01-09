import React,{ useState } from 'react'
import { TextField, Button, Card } from '@mui/material'

const BlogForm=({ createBlog, toggle }) => {

  const [newTitle,setNewTitle]=useState('')
  const [newAuthor, setNewAuthor]=useState('')
  const [newUrl, setNewUrl]=useState('')

  const handleTitleChange=(event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange=(event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange=(event) => {
    setNewUrl(event.target.value)
  }

  const addBlog=(event) => {

    event.preventDefault()

    const newBlog={
      title:newTitle,
      author:newAuthor,
      url:newUrl
    }

    createBlog(newBlog)
    toggle()
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return(
    <div style={{ justifyContent:'center',display:'flex' }}>
      <Card elevation={6} className="loginCard">
        <h2>Create New Blog</h2>
        <form onSubmit={addBlog}>
          <div>
            <TextField
              label="Title"
              variant="standard"
              value={newTitle}
              onChange={handleTitleChange} />
          </div>

          <div>
            <TextField
              label='Author'
              variant="standard"
              value={newAuthor}
              onChange={handleAuthorChange} />
          </div>

          <div>
            <TextField
              label='URL'
              variant="standard"
              value={newUrl}
              onChange={handleUrlChange} />
          </div>
          <Button style={{ marginTop:'30px' }} size="small" variant="outlined" color="primary" onClick={() => toggle()}>cancel</Button>&nbsp; &nbsp;
          <Button style={{ marginTop:'30px' }} size="small" variant="contained" color="primary" type="submit" >create</Button>
        </form>
      </Card>
    </div>
  )
}

export default BlogForm