import React, { useEffect } from 'react'
import Togglable from './Togglable'
import Notification from './Notification'

import storage from '../utils/storage'

import { useDispatch, useSelector } from 'react-redux'
import { intializeBlogs,createNewBlog } from '../reducers/blogReducer'
import { setUserDetail } from '../reducers/userReducer'
import { showNotification } from '../reducers/notificationReducer'

import { List, ListItem, Link, Divider } from '@mui/material'

const BlogApp = () => {

  const dispatch=useDispatch()
  const blogs=useSelector(state => state.blogs).sort((b1,b2) => b2.likes - b1.likes)
  const user=useSelector(state => state.userDetail)
  useEffect(() => {
    dispatch(intializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const localUser= storage.loadUser()
    dispatch(setUserDetail(localUser))
  },[dispatch])

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
      { user ? <Togglable createBlog={createBlog} /> : null }
      <div style={{ marginTop:'20px' }}>
        <List disablePadding>
          {
            blogs.map(blog =>
              <div key={blog.id}>
                <ListItem>
                  <Link href={`/blogs/${blog.id}`} underline="hover" >{blog.title}</Link>
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