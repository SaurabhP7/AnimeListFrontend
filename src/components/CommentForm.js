import React , { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import { Button , TextField } from '@mui/material'

const CommentForm =({ blog }) => {

  const [comment,setComment]=useState('')
  const dispatch=useDispatch()

  const handleCommentChange=(event) => {
    setComment(event.target.value)
  }

  const submitComment=(blog,comment) => {
    const updatedBlog={
      ...blog,
      comments:blog.comments.concat(comment),
      user:blog.user.id
    }
    dispatch(addComment(updatedBlog))
  }

  return(
    <div>
      <div>
        <TextField
          variant="outlined"
          size="small"
          value={comment}
          label="comment"
          onChange={handleCommentChange}
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
              padding: '0 14px',
            },
          }}
        />
        <Button size="small" variant="outlined" color="primary" type='submit' onClick={() => submitComment(blog,comment)}>add comment</Button>
      </div>
    </div>
  )
}

export default CommentForm
