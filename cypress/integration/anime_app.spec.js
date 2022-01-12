describe('Anime app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user={
      name:'YourGoodFriendSP',
      username:'yourgoodfriendsp',
      password:'secret'
    }
    cy.request('POST','http://localhost:3003/api/users/',user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('yourgoodfriendsp')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
      cy.contains('YourGoodFriendSP is logged in')

    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('yourgoodfriendsp')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('html').should('not.contain','YourGoodFriendSP is logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username:'yourgoodfriendsp', password:'secret' })
    })

    it('A anime can be created and liked and deleted', function() {
      cy.contains('create new anime').click()
      cy.get('#title').type('Young Dumb and Broke')
      cy.get('#author').type('yourgoodfriendsp')
      cy.get('#url').type('www.amazon.in')
      cy.get('#create-anime-button').click()
      cy.contains('0')
      cy.contains('like').click()
      cy.contains('1')
      cy.contains('delete').click()
      cy.get('html').should('not.contain','Young Dumb and Broke')
    })

  })



})