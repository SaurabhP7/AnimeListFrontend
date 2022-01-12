import animeService from '../services/animes'

const animeReducer=(state=[],action) => {

  console.log('ACTION',action)

  switch(action.type){

  case 'INIT_BLOGS':
    return action.data

  case 'NEW_BLOG':
    return [...state,action.data]

  case 'DELETE_BLOG':{
    const id = action.data.id
    return state.filter((anime) => {
      anime.id!==id
    })
  }

  case 'INCREASE_LIKES':{
    const changedAnime=action.data
    return state.map(anime =>
      anime.id!==changedAnime.id?anime:changedAnime
    )
  }

  case 'ADD_COMMENT': {
    const commented=action.data
    return state.map(anime =>
      anime.id===commented.id?commented:anime
    )
  }

  default:
    return state
  }
}

export const initializeAnimes = () => {
  return async dispatch => {
    const data = await animeService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data
    })
  }
}

export const createNewAnime=(content) => {
  return async dispatch => {
    const newAnime=await animeService.create(content)
    dispatch({
      type:'NEW_BLOG',
      data:newAnime
    })
  }
}

export const removeParticularAnime=(id) => {
  return async dispatch => {
    await animeService.remove(id)
    dispatch({
      type:'DELETE_BLOG',
      data:{ id }
    })
    const animes=await animeService.getAll()
    dispatch({
      type:'INIT_BLOGS',
      data:animes
    })
  }
}

export const increaseLikesOfAnime=(anime) => {
  return async dispatch => {
    const toLike={ ...anime,likes:anime.likes+1,user:anime.user.id }
    const data=await animeService.update(toLike)
    dispatch({
      type:'INCREASE_LIKES',
      data
    })
  }
}

export const commentAnime=(id,comment) => {
  return async dispatch => {
    const data=await animeService.comment(id,comment)
    dispatch({
      type:'ADD_COMMENT',
      data
    })
  }
}

export default animeReducer