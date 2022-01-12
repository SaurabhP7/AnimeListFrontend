import { createStore,applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import notificationReducer from '../reducers/notificationReducer'
import animeReducer from '../reducers/animeReducer'
import userReducer from '../reducers/userReducer'
import usersReducer from '../reducers/usersReducer'

const reducer=combineReducers({
  animes:animeReducer,
  notification:notificationReducer,
  user:userReducer,
  users:usersReducer,
})

const store=createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store