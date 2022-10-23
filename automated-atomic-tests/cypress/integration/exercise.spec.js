/// <reference types="cypress" />
import LoginPage from "../page-objects/LoginPage";
import ProductsPage from "../page-objects/ProductsPage";
import AppHeader from "../page-objects/AppHeaderPage";
import { LOGIN_USERS, PAGES } from "../support/e2eConstants";

describe("Exercise for automated atomic tests", () => {
  context("Home page", () => {
    //runs before each test
    beforeEach(() => {
      // Open the baseUrl that comes from cypress.json
      cy.visit("");
      // it's important to clear session storage so that it doesn't persist
      // between tests
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });
    });

    it("should be visible", () => {
      //Use the LoginPage page to check that the `screen.should('be.visible')`
      LoginPage.screen.should("be.visible");
    });

    it("allows UI login with a standard user", () => {
      //1. Use the LoginPage page to signIn(LOGIN_USERS.STANDARD)
      LoginPage.signIn(LOGIN_USERS.STANDARD);
      //2. Now check that the ProductsPage.screen is visible. 💡 the same as the test above, only with a different page object
      ProductsPage.screen.should("be.visible");
    });
  });

  // typically we would actually put this into a separate file like Products.spec.js
  // and have another context(). However, 2 contexts() exist only for demonstration
  context("Products", () => {
    it("should be added to cart without UI login", () => {
      //1. Use the setTestContext() to set the sessionStorage first
      cy.setTestContext({
        user: LOGIN_USERS.STANDARD,
        path: PAGES.INVENTORY,
      });
      //2. Use the ProductsPage to addItemToCart(0);
      ProductsPage.addItemToCart(0);
      //3. Now AppHeader.cart should('have.text', '1');
      AppHeader.cart.should("have.text", "1");
    });
  });
});
