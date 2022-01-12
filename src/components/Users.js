import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row ,Col } from 'react-bootstrap'

import user from '../assests/img/user.png'

const Users=() => {

  const users=useSelector(state => state.users)

  return(
    <div>
      <h4>Users</h4>
      <Row style={{ marginTop:'30px' }}>
        <Col>
          <div style={{ marginLeft:'80px' }}>
            <img src={user} width="300" />
          </div>
        </Col>
        <Col>
          <Table size="small" sx={{ width:400 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Number of animes created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} >
                  <TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
                  <TableCell>{user.animes.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Col>
      </Row>
    </div>
  )
}

export default Users