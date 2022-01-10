import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users=() => {

  const users=useSelector(state => state.users)

  return(
    <div>
      <h2>Users</h2>
      <Table size="small" sx={{ width:400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Number of blogs created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} >
              <TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Users