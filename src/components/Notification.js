import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {

  const notification=useSelector( state => state.notification)

  if ( !notification ) {
    return null
  }

  let status=notification.type==='success' ? 'success':'error'

  return(
    <div style={{ marginBottom:'15px' }}>
      <Alert severity={status} >
        {notification.message}
      </Alert>
    </div>
  )
}

export default Notification