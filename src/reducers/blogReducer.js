import blogService from '../services/blogs'

const blogReducer=(state=[],action) => {

  console.log('ACTION',action)

  switch(action.type){

  case 'INIT_BLOGS':
    return action.data

  case 'NEW_BLOG':
    return [...state,action.data]

  case 'DELETE_BLOG':{
    const id = action.data.id
    return state.filter((blog) => {
      blog.id!==id
    })
  }

  case 'INCREASE_LIKES':{
    const changedBlog=action.data
    return state.map(blog =>
      blog.id!==changedBlog.id?blog:changedBlog
    )
  }

  case 'ADD_COMMENT': {
    const changedBlog=action.data.blog
    return state.map(blog =>
      blog!==action.data.blog?blog:changedBlog
    )
  }

  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data
    })
  }
}

export const createNewBlog=(content) => {
  return async dispatch => {
    const newBlog=await blogService.create(content)
    dispatch({
      type:'NEW_BLOG',
      data:newBlog
    })
  }
}

export const removeParticularBlog=(id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type:'DELETE_BLOG',
      data:{ id }
    })
    const blogs=await blogService.getAll()
    dispatch({
      type:'INIT_BLOGS',
      data:blogs
    })
  }
}

export const increaseLikesOfBlog=(blog) => {
  return async dispatch => {
    const toLike={ ...blog,likes:blog.likes+1,user:blog.user.id }
    const data=await blogService.update(toLike)
    dispatch({
      type:'INCREASE_LIKES',
      data
    })
  }
}

export const addComment=(blog) => {
  return async dispatch => {
    await blogService.update(blog)
    dispatch({
      type:'ADD_COMMENT',
      data:{ blog }
    })

  }
}

export default blogReducer