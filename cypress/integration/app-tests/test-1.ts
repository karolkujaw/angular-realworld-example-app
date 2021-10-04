describe('Our first Cypress test script ', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  function logout() {
    cy.getByDataCy('edit_profile_settings_button').click()
    cy.get('.btn-outline-danger').click()
  }

  it('check the header of the initial page', () => {
    // cy.get('[data-cy=home_page_header]').should('have.text', 'conduit')
    cy.getByDataCy('home_page_header').should('have.text', 'conduit')
  })

  const userCredentials = {
    "user": {
      "email": "kkujawski.t.a.@gmail.com",
      "password": "CypressTSH"
    }
  }

  it.only('I can do the headless authorization', () => {
    cy.request('POST', 'https://api.realworld.io/api/users/login', userCredentials)
      .its('body').then(body => {
        const token = body.user.token
        const username = body.user.username
        cy.wrap(token).as('token')
        cy.visit('/', {
          onBeforeLoad(win) {
            win.localStorage.setItem('jwtToken', token)
          }
        })
        cy.contains(username).click()
        cy.get('h4').contains(username)
      })
    logout();
  })

})