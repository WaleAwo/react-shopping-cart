class ShoppingCartPage {
  visit() {
    cy.visit('http://localhost:3000');
    return this;
  }

  getCheckoutButton = () => cy.contains('Checkout');
  getShoppingCartButton = () => cy.get('.Cart__CartButton-sc-1h98xa9-0');

  getProductFoundText() {
    return cy.get('.App__MainHeader-sc-ebmerl-4').find('p');
  }

  getSubTotalText() {
    return cy.get('.Cart__SubPriceValue-sc-1h98xa9-9');
  }

  getEmptyShoppingCartText() {
    return cy.get('.CartProducts__CartProductsEmpty-sc-7th5t8-1');
  }

  clickProduct(product: Product) {
    cy.contains(product).next().next().click({ force: true });
    return this;
  }

  clickSizeCheckbox(size: Size) {
    cy.get(`[data-testid="checkbox"][value="${size}"]`).check({ force: true });
    return this;
  }

  clickCheckoutButton() {
    this.getCheckoutButton().click();
    return this;
  }

  clickShoppingCartButton() {
    this.getShoppingCartButton().click();
    return this;
  }

  removeProduct(product: Product) {
    cy.get(`img.CartProduct__Image-sc-11uohgb-7[alt="${product}"]`)
      .prev()
      .click();
    return this;
  }
}

export enum Size {
  extraSmall = 'XS',
  small = 'S',
  medium = 'M',
  mediumLarge = 'ML',
  large = 'L',
  extraLarge = 'XL',
  extraExtraLarge = 'XXL',
}

export enum Product {
  CroppedStayGroovyOffWhite = 'Cropped Stay Groovy off white',
  BasicCactusWhiteTShirt = 'Basic Cactus White T-shirt',
  SkaterBlackSweatshirt = 'Skater Black Sweatshirt',
  BlackTuleOversized = 'Black Tule Oversized',
  BlackBatmanTShirt = 'Black Batman T-shirt',
  BlueTShirt = 'Blue T-Shirt',
  LooseBlackTShirt = 'Loose Black T-shirt',
  RingerHallPass = 'Ringer Hall Pass',
  GreyTShirt = 'Grey T-shirt',
  BlackTShirtWithWhiteStripes = 'Black T-shirt with white stripes',
  TurtlesNinjaTShirt = 'Turtles Ninja T-shirt',
  SlimBlackTShirt = 'Slim Black T-shirt',
  BlueSweatshirt = 'BlueSweatshirt',
  WhiteTShirtGucci = 'White T-shirt Gucci',
  TropicalWineTShirt = 'Tropical Wine T-shirt',
  MarineBlueTShirt = 'Marine Blue T-shirt',
}

export default new ShoppingCartPage();
