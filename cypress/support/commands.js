/* eslint-disable no-mixed-spaces-and-tabs */
Cypress.Commands.add('login',({ username, password }) => {
  cy.request('POST','http://localhost:3003/api/login',{
    username,password
  }).then(({ body }) => {
    localStorage.setItem('loggedAnimeappUser',JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createanime',({ author, title, url }) => {
  cy.request({
	  url:'http://localhost:3003/api/animes',
	  method:'POST',
	  body:{ author, title, url },
	  headers:{
      'Authorization':`bearer ${JSON.parse(localStorage.getItem('loggedAnimeappUser')).token}`
	  }
  })
})