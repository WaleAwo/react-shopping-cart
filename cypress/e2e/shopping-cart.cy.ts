import shoppingCartPo, { Product, Size } from '../pom/pages/shopping-cart.po';

describe('Shopping Cart', () => {
  beforeEach(() => {
    shoppingCartPo.visit();
  });

  function verifyEmptyShoppingCart() {
    shoppingCartPo
      .clickShoppingCartButton()
      .getEmptyShoppingCartText()
      .should('contain', 'Add some products in the cart')
      .and('be.visible');
  }

  it('Should add and update shopping cart items', () => {
    // Add product
    shoppingCartPo
      .clickProduct(Product.LooseBlackTShirt)
      .clickProduct(Product.BlackTuleOversized);

    shoppingCartPo.getSubTotalText().should('have.text', '$ 43.45');

    // Update product
    shoppingCartPo.clickProduct(Product.LooseBlackTShirt);
    shoppingCartPo.getSubTotalText().should('have.text', '$ 57.45');

    // Remove product
    shoppingCartPo.removeProduct(Product.LooseBlackTShirt);
    shoppingCartPo.getSubTotalText().should('have.text', '$ 29.45');
  });

  it('Should filter products by size', () => {
    shoppingCartPo
      .getProductFoundText()
      .should('have.text', '16 Product(s) found');

    shoppingCartPo.clickSizeCheckbox(Size.extraSmall);
    shoppingCartPo
      .getProductFoundText()
      .should('have.text', '1 Product(s) found');

    shoppingCartPo.clickSizeCheckbox(Size.extraLarge);
    shoppingCartPo
      .getProductFoundText()
      .should('have.text', '11 Product(s) found');
  });

  it('Should display an empty shopping cart message after refresh', () => {
    verifyEmptyShoppingCart();

    shoppingCartPo
      .clickSizeCheckbox(Size.large)
      .getProductFoundText()
      .should('have.text', '10 Product(s) found');

    shoppingCartPo
      .clickProduct(Product.CroppedStayGroovyOffWhite)
      .clickProduct(Product.RingerHallPass)
      .clickProduct(Product.TurtlesNinjaTShirt)
      .getSubTotalText()
      .should('have.text', '$ 32.70');

    shoppingCartPo.getEmptyShoppingCartText().should('not.exist');

    shoppingCartPo
      .removeProduct(Product.CroppedStayGroovyOffWhite)
      .removeProduct(Product.RingerHallPass)
      .removeProduct(Product.TurtlesNinjaTShirt);

    cy.reload();

    verifyEmptyShoppingCart();

    shoppingCartPo.getSubTotalText().should('have.text', '$ 0.00');
  });
});
