const userReducer=(state=null,action) => {

  console.log('ACTION',action.type)

  switch(action.type){
  case 'LOGIN':{
    return action.payload
  }

  case 'LOGOUT':{
    return null
  }

  default :
    return state
  }
}

export const login=(user) => {
  return async dispatch => {
    dispatch({
      type:'LOGIN',
      payload:user
    })
  }
}

export const logout=() => (
  { type:'LOGOUT' }
)

export default userReducer