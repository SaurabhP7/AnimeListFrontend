import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { List, ListItem, Divider, Link } from '@mui/material'

const User=() => {
  const userId=useParams().id
  const user=useSelector(state => state.users.find(u => u.id===userId))
  if(!user) return null
  return(
    <div>
      <h2>{user.name}</h2>
      <h3>added {user.blogs.length===0?0:null} blogs</h3>
      <List>
        {user.blogs.map(blog =>
          <div key={blog.id}>
            <ListItem key={blog.id}>
              <Link href={`/blogs/${blog.id}`} underline="hover" >{blog.title}</Link>
            </ListItem>
            <Divider />
          </div>
        )}
      </List>
    </div>

  )
}

export default User