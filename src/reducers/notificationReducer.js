const notificationReducer=(state=null,action) => {

  console.log('ACTION',action)

  switch(action.type){

  case 'SHOW_NOTIFICATION':
    return action.data

  case 'HIDE_NOTIFICATION':
    return null

  default:
    return state
  }
}

export const showNotification=(message,type) => {
  return async dispatch => {

    await dispatch({
      type:'SHOW_NOTIFICATION' ,
      data:{
        message,
        type
      }
    })

    setTimeout(() => {
      dispatch({
        type:'HIDE_NOTIFICATION' ,
        data:null
      })
    },3000)

  }
}

export default notificationReducer