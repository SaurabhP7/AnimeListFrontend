import React, { useEffect, useState } from 'react'
import userService from '../services/users'
import { useParams } from 'react-router-dom'

const User=() => {
  const userId=useParams().id
  const [users,setUsers]=useState([])

  useEffect(() => {
    userService.getAll().then((users) => {
      setUsers(users)
    })
  },[])

  let userRequired=users.find(user => {
    return(
      user.id===(userId)
    )
  })

  if(!userRequired){
    return null
  }

  return(
    <div>
      <h2>{userRequired.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {userRequired.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>

  )
}

export default User