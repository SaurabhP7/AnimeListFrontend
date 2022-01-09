import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router'

import storage from '../utils/storage'
import blogService from '../services/blogs'

import { removeParticularBlog,increaseLikesOfBlog } from '../reducers/blogReducer'
import CommentForm from './CommentForm'
import { Button } from '@mui/material'

const BlogDetails=({ loggedUser }) => {

  const [blogs,setBlogs]=useState(null)
  const [blog,setBlog]=useState(null)
  const [user,setUser]=useState({})
  const blogId=useParams().id
  const dispatch=useDispatch()
  const history=useHistory()

  const increaseLikesOf=(id) => {
    const blogToLike=blogs.find(b => b.id===id)
    const likedBlog={
      ...blogToLike,
      likes:blogToLike.likes+1,
      user:blogToLike.user.id
    }
    dispatch(increaseLikesOfBlog(likedBlog,id))
    blogService.getAll().then(( blogs ) => {
      setBlogs(blogs)
      const reqblog=blogs.find(blog => blog.id===blogId)
      setBlog(reqblog)
    })
  }

  const deleteBlogOf=(id) => {
    const blog=blogs.find(b => b.id===id)
    if (window.confirm(`Do you want to delete ${blog.title}?`)) {
      dispatch(removeParticularBlog(id))
    }
    history.push('/')
  }

  useEffect(() => {
    blogService.getAll().then(( blogs ) => {
      setBlogs(blogs)
      const reqblog=blogs.find(blog => blog.id===blogId)
      setBlog(reqblog)
    })
  },[])

  useEffect(() => {
    const localUser= storage.loadUser()
    setUser(localUser)
  },[])

  if(!blog) return null

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
              <Button size="small" variant="outlined" color="primary" onClick={() => deleteBlogOf(blog.id)}>delete</Button>
              :null}
          </div>
          :
          <div>
            <div><h2>{blog.title}</h2></div>
            <div>{blog.author}</div>
            <div>likes {blog.likes} <Button size="small" variant="outlined" color="primary" onClick={() => increaseLikesOf(blog.id)}>like</Button></div>
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