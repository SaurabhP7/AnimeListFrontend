const userReducer=(state={},action) => {

  console.log('ACTION',action.type)

  switch(action.type){
  case 'SET_USER':{
    return action.data
  }

  case 'REMOVE_USER':{
    return null
  }

  default :
    return state
  }
}

export const setUserDetail=(user) => {
  return async dispatch => {
    dispatch({
      type:'SET_USER',
      data:user
    })
  }
}

export const removeUser=() => {
  return async dispatch => {
    dispatch({
      type:'REMOVE_USER',
      data:null
    })
  }
}

export default userReducer