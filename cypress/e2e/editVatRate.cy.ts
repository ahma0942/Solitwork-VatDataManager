describe('Validate Add/Edit Posting Type', () => {
  it('Verifies Update Posting Values', () => {
    let textBoxInput = 'New Vat Rate';
    cy.visit("/app/accounts/logs");

    cy.get("button[data-cy='vatRateTab']").eq(0).click();
    cy.get("td[data-cy='editVatRate']").eq(0).click();

    cy.get("input[formControlName='vatRateID']").eq(0).focus().clear();
    cy.get("input[formControlName='vatRateID']").eq(0).type(textBoxInput);

    cy.get("input[formControlName='legalEntity']").eq(0).focus().clear();
    cy.get("input[formControlName='legalEntity']").eq(0).type("EEC");

    cy.get("input[formControlName='account']").eq(0).focus().clear();
    cy.get("input[formControlName='account']").eq(0).type('929095');

    cy.get("nz-select[formControlName='expectedVATType']").eq(0).click();
    cy.get("nz-option-item").eq(0).click();

    cy.get("input[formControlName='expectedVATRate']").eq(0).focus().clear();
    cy.get("input[formControlName='expectedVATRate']").eq(0).invoke('val',2.5).trigger('input');

    cy.get('.ant-picker-input input').eq(0).focus().clear();
    cy.get('.ant-picker-input input').eq(0).type('2023-08-01').should('have.value', '2023-08-01');
    cy.get('.ant-picker-input input').eq(1).focus().clear();
    cy.get('.ant-picker-input input').eq(1).type('2023-08-01').should('have.value', '2023-08-01');
    cy.get('.ant-picker-input').eq(1).type('{enter}');

    cy.get("button").contains("Update").eq(0).click();
    cy.wait(1000).then(afterWait=>{
      cy.get("td[data-cy='vatRateID']").eq(0).should('contain.text',textBoxInput);
      cy.get("td[data-cy='legalEntity']").eq(0).should('contain.text','EEC');
      cy.get("td[data-cy='account']").eq(0).should('contain.text','929095');
      cy.get("td[data-cy='expectedVATType']").eq(0).should('contain.text','domestic');
      cy.get("td[data-cy='expectedVATRate']").eq(0).should('contain.text','2.5');
      cy.get("td[data-cy='validfrom']").eq(0).should('contain.text','2023-08-01');
      cy.get("td[data-cy='validto']").eq(0).should('contain.text','2023-08-01');
    });
  })
})
