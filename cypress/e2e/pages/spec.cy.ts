class HomePage {
  visit(): this {
    cy.visit('http://localhost:3000')
    return this
  }

  verifyHeroHeading(): this {
    cy.getByData("hero-heading")
      .contains('Testing Next.js Applications with Cypress')
    return this
  }

  verifyFeatures(): this {
    const expectedFeatures = [
      '4 Courses',
      '25+ Lessons',
      'Free and Open Source'
    ]

    cy.get("dt").each(($el, index) => {
      cy.wrap($el).contains(expectedFeatures[index])
    })
    return this
  }

  navigateToCourse(courseIndex: number, expectedPath: string): this {
    cy.getByData(`course-${courseIndex}`)
      .find('a')
      .contains('Get started')
      .click()
    
    cy.location('pathname').should('equal', expectedPath)
    return this
  }
}

export default new HomePage()