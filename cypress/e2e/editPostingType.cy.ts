describe('Validate Add/Edit Posting Type', () => {
  it('Verifies Update Posting Values', () => {
    let textBoxInput = 'TestPostingCategory';
    cy.visit("/app/accounts/logs");

    cy.get("button[data-cy='postingTab']").eq(0).click();
    cy.get("td[data-cy='editPostingType']").eq(0).click();

    cy.get("input[formControlName='postingType']").eq(0).focus().clear();
    cy.get("input[formControlName='postingType']").eq(0).type(textBoxInput);

    cy.get('.ant-picker-input input').eq(0).focus().clear();
    cy.get('.ant-picker-input input').eq(0).type('2023-08-01').should('have.value', '2023-08-01');
    cy.get('.ant-picker-input input').eq(1).focus().clear();
    cy.get('.ant-picker-input input').eq(1).type('2023-08-01').should('have.value', '2023-08-01');
    cy.get('.ant-picker-input').eq(1).type('{enter}');

    cy.get("input[type='checkbox']").eq(0).check();
    cy.get("button").contains("Update").eq(0).click();
    cy.wait(1000).then(afterWait=>{
      cy.get("td[data-cy='postingType']").eq(0).should('contain.text',textBoxInput);
      cy.get("td[data-cy='isVATExpectedOnPostingType']").eq(0).should('contain.text','true');
      cy.get("td[data-cy='validfrom']").eq(0).should('contain.text','2023-08-01');
      cy.get("td[data-cy='validto']").eq(0).should('contain.text','2023-08-01');
    });
  })
})
