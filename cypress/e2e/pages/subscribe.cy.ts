class NewsletterPage {
  visit(): this {
    cy.visit('http://localhost:3000')
    return this
  }

  enterEmail(email: string): this {
    cy.getByData('email-input').type(email)
    return this
  }

  submitSubscription(): this {
    cy.getByData('submit-button').click()
    return this
  }

  verifySuccessMessage(email: string): this {
    cy.getByData('success-message')
      .should('exist')
      .contains(email)
    return this
  }

  verifyNoSuccessMessage(): this {
    cy.getByData('success-message').should('not.exist')
    return this
  }

  verifyServerErrorMessage(): this {
    cy.getByData('server-error-message')
      .should('exist')
      .contains('already exists. Please use a different email address.')
    return this
  }

  subscribeNewsletter(email: string, options: { 
    expectSuccess?: boolean 
  } = {}): this {
    const { expectSuccess = true } = options

    this.enterEmail(email)
      .submitSubscription()

    if (expectSuccess) {
      this.verifySuccessMessage(email)
    } else {
      this.verifyNoSuccessMessage()
    }

    return this
  }
}

export default new NewsletterPage()