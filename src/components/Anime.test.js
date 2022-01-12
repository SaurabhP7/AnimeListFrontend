import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Anime from './Anime'

test('has only title and author',() => {

  const anime={
    title:'Hello World',
    author:'Every Programmer'
  }

  const component=render(
    <Anime anime={anime} />
  )

  const div=component.container.querySelector('.animeTest')

  expect(div).toHaveTextContent(
    'Hello World Every Programmer'
  )

})
