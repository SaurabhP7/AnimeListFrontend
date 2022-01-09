import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'

import { removeParticularBlog,increaseLikesOfBlog } from '../reducers/blogReducer'
import CommentForm from './CommentForm'
import { Button } from '@mui/material'

const BlogDetails=({ loggedUser }) => {

  const blogId=useParams().id
  const blog=useSelector(state => state.blogs.find(b => b.id===blogId))
  const user=useSelector(state => state.user)
  const dispatch=useDispatch()
  const history=useHistory()

  if(!blog) return null

  const increaseLikesOf=(blog) => {
    dispatch(increaseLikesOfBlog(blog))
  }

  const deleteBlog=() => {
    if (window.confirm(`Do you want to delete ${blog.title}?`)) {
      dispatch(removeParticularBlog(blogId))
      history.push('/')
    }
  }

  return(
    <div>
      <h2>Blogs</h2>
      <div>
        {loggedUser?
          <div>
            <div><h2>{blog.title}</h2></div>
            <div>{blog.author}</div>
            <div>likes {blog.likes} <Button size="small" variant="outlined" sx={{ fontSize:10,padding:'2px 2px' }} color="primary" onClick={() => increaseLikesOf(blog.id)}>like</Button></div>
            <div>{blog.url}</div>
            {user.username===blog.author?
              <Button size="small" variant="outlined" color="primary" onClick={deleteBlog}>delete</Button>
              :null}
          </div>
          :
          <div>
            <div><h2>{blog.title}</h2></div>
            <div>{blog.author}</div>
            <div>likes {blog.likes} <Button size="small" variant="outlined" color="primary" onClick={() => increaseLikesOf(blog)}>like</Button></div>
            <div>{blog.url}</div>
          </div>
        }
        <div>
          <h3>Comments</h3>
          <CommentForm blog={blog}/>
          <ul>
            {blog.comments.map((comment) => {
              return(<li key={comment}>{comment}</li>)
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BlogDetails