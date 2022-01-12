import React, { useState } from 'react'
import AnimeForm from './AnimeForm'
import { Button } from '@mui/material'

const Togglable=({ createAnime }) => {

  const [visibile,setVisible]=useState(false)

  const hideWhenVisible={ display:visibile?'none':'' }
  const showWhenVisible={ display:visibile?'':'none' }

  const toggleVisibilty=() => {
    setVisible(!visibile)
  }

  return(
    <div>
      <div style={hideWhenVisible}>
        <Button size="small" variant="outlined" color="primary" onClick={toggleVisibilty}>create new anime</Button>
      </div>

      <div style={showWhenVisible}>
        <AnimeForm createAnime={createAnime} toggle={setVisible} />
      </div>
    </div>
  )
}

export default Togglable