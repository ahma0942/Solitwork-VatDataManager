describe('Validate Add/Edit Account', () => {
  it('Verifies Update Account Values', () => {
    let textBoxInput = 'TestAccount';
    cy.visit("/app/accounts/logs");
    cy.get("td[data-cy='editAccount']").eq(0).click();
    cy.get("input[formControlName='account']").eq(0).focus().clear();
    cy.get("input[formControlName='account']").eq(0).type(textBoxInput);
    cy.get("nz-select[data-cy='vatCategory']").eq(0).click();
    cy.get("nz-option-item").eq(0).click();
    cy.get("input[type='checkbox']").eq(0).check();
    cy.get("button").contains("Update").eq(0).click();
    cy.wait(1000).then(afterWait=>{
      cy.get("td[data-cy='accountId']").eq(0).should('contain.text',textBoxInput);
      cy.get("td[data-cy='accountVCategory']").eq(0).should('contain.text','incoming');
      cy.get("td[data-cy='accountVATA']").eq(0).should('contain.text','true');
    });
  })
})
