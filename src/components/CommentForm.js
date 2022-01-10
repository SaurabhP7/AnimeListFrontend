import React, { useState } from 'react'
import { Button , TextField } from '@mui/material'

const CommentForm =({ handleComment }) => {

  const [comment,setComment]=useState('')

  const handleCommentChange=(event) => {
    event.preventDefault()
    const content=event.target.value
    setComment(content)
  }

  return(
    <div>
      <div>
        <form onSubmit={() => handleComment(comment)}>
          <TextField
            variant="outlined"
            size="small"
            value={comment}
            onChange={handleCommentChange}
            label="comment"
            InputLabelProps={{
              style: {
                fontSize: 12,
                paddingBottom: 10,
              },
            }}
            inputProps={{
              style: {
                fontSize: 14,
                height: 30,
                padding: '0px 14px',
              },
            }}
          />
          <Button size="small" variant="outlined" color="primary" type='submit'>add comment</Button>
        </form>
      </div>
    </div>
  )
}

export default CommentForm
