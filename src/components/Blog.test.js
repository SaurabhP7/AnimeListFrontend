import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('has only title and author',() => {

  const blog={
    title:'Hello World',
    author:'Every Programmer'
  }

  const component=render(
    <Blog blog={blog} />
  )

  const div=component.container.querySelector('.blogTest')

  expect(div).toHaveTextContent(
    'Hello World Every Programmer'
  )

})
