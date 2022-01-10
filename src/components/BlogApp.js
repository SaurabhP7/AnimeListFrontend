import React from 'react'
import Togglable from './Togglable'
import Notification from './Notification'

import { useDispatch, useSelector } from 'react-redux'
import { createNewBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'

import { List, ListItem, Divider } from '@mui/material'

import { Link } from 'react-router-dom'

const BlogApp = () => {

  const dispatch=useDispatch()
  const blogs=useSelector(state => state.blogs)
  const notifyWith =(message,type='success') => {
    dispatch(showNotification(message,type))
  }

  const createBlog=(blogObject) => {
    dispatch(createNewBlog(blogObject))
    notifyWith(`${blogObject.title} is created`)
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <Togglable createBlog={createBlog} />
      <div style={{ marginTop:'20px' }}>
        <List disablePadding>
          {
            blogs.map(blog =>
              <div key={blog.id}>
                <ListItem>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </ListItem>
                <Divider />
              </div>
            )
          }
        </List>
      </div>
    </div>
  )
}

export default BlogApp