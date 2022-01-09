import axios from 'axios'
const baseUrl = '/api/blogs'
import storage from '../utils/storage'

const getConfig=() => {
  return{
    headers:{
      Authorization:`bearer ${storage.loadUser().token}`
    }
  }
}

const getAll=() => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create=blog => {
  const request=axios.post(baseUrl,blog,getConfig())
  return request.then(response => response.data)
}

const update = (blog) => {
  const request = axios.put(`${baseUrl}/${blog.id}`, blog, getConfig())
  return request.then(response => response.data)
}

const remove=(id) => {
  const request = axios.delete(`${baseUrl}/${id}`, getConfig())
  return request.then(response => response.data)
}

const obj={ getAll, create, update ,remove }
export default obj