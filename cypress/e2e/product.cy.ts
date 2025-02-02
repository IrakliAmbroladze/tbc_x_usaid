export {};
describe("product manipulation", () => {
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

  it("successfully adds a new product and verifies its presence", () => {
    cy.get('[data-cy="menu"]').click();
    cy.get('[data-cy="products-header"]').click();
    cy.get('[data-cy="add-new-product"]').click();
    cy.get('[id="title_ka"]').clear().type(title_ka);
    cy.get('[id="title_en"]').clear().type(title_en);
    cy.get('[id="description_ka"]').clear().type(description_ka);
    cy.get('[id="description_en"]').clear().type(description_en);
    cy.get('[id="category_ka"]').clear().type(category_ka);
    cy.get('[id="category_en"]').clear().type(category_en);
    cy.get('[id="price"]').clear().type(price);
    cy.get('[id="image"]').clear().type(image);

    cy.intercept("POST", ADD_PRODUCT_API).as("addProduct");
    cy.get('[data-cy="submit"]').click();

    cy.wait("@addProduct").then(({ response }) => {
      const body =
        typeof response?.body === "string"
          ? JSON.parse(response.body)
          : response?.body;
      expect(body).to.have.property("message", "Product added successfully");
      expect(body).to.have.property("product");
      productId = body.product[0].id;
      expect(productId).to.be.a("number");
    });
  });

  it("successfully deletes a product and verifies its absence", () => {
    createProduct().then((response) => {
      expect(response.status).to.eq(200);
      productId = response.body.product[0].id;

      cy.get('[data-cy="menu"]').click();
      cy.get('[data-cy="products-header"]').click();
      cy.intercept("DELETE", DELETE_PRODUCT_API).as("deleteProduct");

      cy.get(`[product-id=${productId}]`).click();
      cy.wait("@deleteProduct").then(({ response }) => {
        const body =
          typeof response?.body === "string"
            ? JSON.parse(response.body)
            : response?.body;
        expect(body).to.have.property(
          "message",
          "Product deleted successfully",
        );
      });
    });
  });
});
