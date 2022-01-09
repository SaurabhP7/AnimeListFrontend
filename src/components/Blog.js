import React from 'react'
import { Link, ListItem,Divider } from '@mui/material'
const Blog = ({ blog }) => {

  return(
    <div className="blogTest" >
      <ListItem>
        <Link href={`/blogs/${blog.id}`} underline="hover">{blog.title}</Link>
      </ListItem>
      <Divider/>
    </div>
  )

}

export default Blog