import React,{ useState } from 'react'
import { TextField, Button, Card } from '@mui/material'

const AnimeForm=({ createAnime, toggle }) => {

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

  const addAnime=(event) => {

    event.preventDefault()

    const newAnime={
      title:newTitle,
      author:newAuthor,
      url:newUrl
    }

    createAnime(newAnime)
    toggle()
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return(
    <div style={{ justifyContent:'center',display:'flex' }}>
      <Card elevation={6} className="loginCard">
        <h4>Create New Anime</h4>
        <form onSubmit={addAnime}>
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

export default AnimeForm