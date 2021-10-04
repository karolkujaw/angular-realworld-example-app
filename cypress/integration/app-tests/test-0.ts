describe('Our first Cypress test script ', () => {
  it('works', () => {
    expect(Cypress.version).to.be.a('string')
  })
})