export {};
describe("placing an order", () => {
  const testEmail = "ambroladzeika@gmail.com";
  const testPassword = "test123";
  const title_ka = "სატესტო სათაური";
  const title_en = "Test Title";
  const description_ka = "სატესტო აღწერა";
  const description_en = "Test Description";
  const category_ka = "სატესტო კატეგორია";
  const category_en = "Test Category";
  const price = "200";
  const image =
    "https://cbhoxdzzhvcuajscuqes.supabase.co/storage/v1/object/public/product-images/kp-01.png";

  const ADD_PRODUCT_API = "/api/add-product";
  const DELETE_PRODUCT_API = "/api/delete-product";

  let productId: number | string | undefined;

  const productData = {
    title_ka,
    title_en,
    description_ka,
    description_en,
    category_ka,
    category_en,
    price,
    image,
  };

  function createProduct() {
    return cy.request("POST", ADD_PRODUCT_API, productData);
  }

  function deleteProduct(id: number | string) {
    return cy.request("DELETE", DELETE_PRODUCT_API, { id });
  }
  const deleteProductFromCart = (productId: number | string | undefined) => {
    cy.get(`[data-cy=remove-${productId}]`).click();
  };

  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="sign-in"]').click();
    cy.url().should("include", "sign-in");
    cy.get('[data-cy="sign-in-email"]').type(testEmail);
    cy.get('[data-cy="sign-in-password"]').type(testPassword);
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="sign-out"]').should("exist");
  });

  afterEach(() => {
    if (productId) {
      deleteProduct(productId);
      productId = undefined;
    }
  });

  it("successfully creates an order", () => {
    createProduct().then((response) => {
      expect(response.status).to.eq(200);
      productId = response.body.product[0].id;

      cy.get('[data-cy="menu"]').click();
      cy.get('[data-cy="products-header"]').click();
      cy.wait(3000);
      cy.get(`[data-cy=image-${productId}]`).click();
      cy.wait(3000);
      cy.get('[data-cy="cartBtn"]').should("be.visible").click();
      cy.visit("/en/cart");
      cy.wait(3000);
      cy.intercept("POST", "/api/cart-checkout", {
        statusCode: 200,
      }).as("getMessagePOST");
      cy.wait(3000);
      deleteProductFromCart(productId);
      cy.visit("/");
    });
  });
});
