describe('Validate Add/Edit Journal Category', () => {
  it('Verifies Update Journal Category Value', () => {

    let textBoxInput = 'TestJournal';
    const startDate = new Date('2023-08-01');
    const endDate = new Date('2023-08-07');
    // Format dates as required
    const formattedStartDate = startDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    const formattedEndDate = endDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    cy.visit("/app/accounts/logs");
    cy.get("button[data-cy='journalTab']").eq(0).click();
    cy.get("td[data-cy='editJournal']").eq(0).click();

    cy.get("input[formControlName='journalCategory']").eq(0).focus().clear();
    cy.get("input[formControlName='journalCategory']").eq(0).type(textBoxInput);
    cy.get("nz-select[data-cy='transactionVATCategory']").eq(0).click();
    cy.get("nz-option-item").eq(0).click();
    cy.get('.ant-picker-input input').eq(0).focus().clear();
    cy.get('.ant-picker-input input').eq(0).type('2023-08-01').should('have.value', '2023-08-01');
    cy.get('.ant-picker-input input').eq(1).focus().clear();
    cy.get('.ant-picker-input input').eq(1).type('2023-08-07').should('have.value', '2023-08-07');


    cy.get("button").contains("Update").eq(0).click();
    cy.wait(1000).then(afterWait=>{
      cy.get("td[data-cy='journalCategory']").eq(0).should('contain.text',textBoxInput);
      cy.get("td[data-cy='transactionVATCategory']").eq(0).should('contain.text','incoming');
      cy.get("td[data-cy='validfrom']").eq(0).should('contain.text','2023-08-01');
      cy.get("td[data-cy='validto']").eq(0).should('contain.text','2023-08-07');
    });
  })
})
