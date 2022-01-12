import React from 'react'
import Togglable from './Togglable'
import Notification from './Notification'

import { useDispatch, useSelector } from 'react-redux'
import { createNewAnime } from '../reducers/animeReducer'
import { showNotification } from '../reducers/notificationReducer'

import { List, ListItem, Divider } from '@mui/material'

import { Link } from 'react-router-dom'

const AnimeApp = () => {

  const dispatch=useDispatch()
  const animes=useSelector(state => state.animes)
  const notifyWith =(message,type='success') => {
    dispatch(showNotification(message,type))
  }

  const createAnime=(animeObject) => {
    dispatch(createNewAnime(animeObject))
    notifyWith(`${animeObject.title} is created`)
  }

  return (
    <div>
      <h2>Animes</h2>
      <Notification />
      <Togglable createAnime={createAnime} />
      <div style={{ marginTop:'20px' }}>
        <List disablePadding>
          {
            animes.map(anime =>
              <div key={anime.id}>
                <ListItem>
                  <Link to={`/animes/${anime.id}`}>{anime.title}</Link>
                </ListItem>
                <Divider />
              </div>
            )
          }
        </List>
      </div>
    </div>
  )
}

export default AnimeApp