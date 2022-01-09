import React , { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import { Button , TextField } from '@mui/material'
import { useHistory } from 'react-router'

const CommentForm =({ blog }) => {

  const [comment,setComment]=useState('')
  const dispatch=useDispatch()
  const history=useHistory()

  const handleCommentChange=(event) => {
    setComment(event.target.value)
  }

  const submitComment=(blog,comment) => {
    const newComments=blog.comments.concat(comment)
    const updatedBlog={
      ...blog,
      comments:newComments,
      user:blog.user.id
    }
    dispatch(addComment(updatedBlog))
    history.push(`/blogs/${updatedBlog.id}`)
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
