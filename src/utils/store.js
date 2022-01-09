import { createStore,applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import notificationReducer from '../reducers/notificationReducer'
import blogReducer from '../reducers/blogReducer'
import userReducer from '../reducers/userReducer'

const reducer=combineReducers({
  blogs:blogReducer,
  notification:notificationReducer,
  userDetail:userReducer,
})

const store=createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store