describe('Validate Add/Edit Country', () => {
  it('Verifies Update Country Values', () => {

    let textBoxInput = 'TestCountry';

    cy.visit("/app/accounts/logs");
    cy.get("button[data-cy='countryTab']").eq(0).click();
    cy.get("td[data-cy='editCountry']").eq(0).click();

    cy.get("input[formControlName='legalEntity']").eq(0).focus().clear();
    cy.get("input[formControlName='legalEntity']").eq(0).type(textBoxInput);
    cy.get("input[formControlName='legalEntityVATCountry']").eq(0).focus().clear();
    cy.get("input[formControlName='legalEntityVATCountry']").eq(0).type('TC');
    cy.get('.ant-picker-input input').eq(0).focus().clear();
    cy.get('.ant-picker-input input').eq(0).type('2023-08-01').should('have.value', '2023-08-01');
    cy.get('.ant-picker-input input').eq(1).focus().clear();
    cy.get('.ant-picker-input input').eq(1).type('2023-08-01').should('have.value', '2023-08-01');


    cy.get("button").contains("Update").eq(0).click();
    cy.wait(1000).then(afterWait=>{
      cy.get("td[data-cy='legalEntity']").eq(0).should('contain.text',textBoxInput);
      cy.get("td[data-cy='legalEntityVATCountry']").eq(0).should('contain.text','TC');
      cy.get("td[data-cy='validfrom']").eq(0).should('contain.text','2023-08-01');
      cy.get("td[data-cy='validto']").eq(0).should('contain.text','2023-08-01');
    });
  })
})
