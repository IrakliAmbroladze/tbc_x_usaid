describe("new product manipulation", () => {
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
  let stripeProductId: string | undefined;

  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="sign-in"]').click();
    cy.url().should("include", "sign-in");
    cy.get('[data-cy="sign-in-email"]').type(testEmail);
    cy.get('[data-cy="sign-in-password"]').type(testPassword);
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="sign-out"]').should("exist");
  });

  it("adds and deletes a new product successfully", () => {
    cy.get('[data-cy="products-header"]').click();
    cy.get('[data-cy="product-list-title"]').should("exist");
    cy.get('[data-cy="add-new-product"]').click();
    cy.get('[data-cy="add-new-product-title"]').should("exist");
    cy.get('[id="title_ka"]').type(title_ka);
    cy.get('[id="title_en"]').type(title_en);
    cy.get('[id="description_ka"]').type(description_ka);
    cy.get('[id="description_en"]').type(description_en);
    cy.get('[id="category_ka"]').type(category_ka);
    cy.get('[id="category_en"]').type(category_en);
    cy.get('[id="price"]').clear().type(price);
    cy.get('[id="image"]').type(image);

    cy.intercept("POST", "/api/add-product").as("addProduct");

    cy.get('[data-cy="submit"]').click();

    cy.wait("@addProduct").then(({ response }) => {
      const body =
        typeof response?.body === "string"
          ? JSON.parse(response.body)
          : response?.body;

      expect(body).to.have.property("message", "Product added successfully");
      expect(body).to.have.property("product");
      expect(body.product).to.be.an("array").that.is.not.empty;

      stripeProductId = body.product[0].stripe_product_id;
      expect(stripeProductId).to.be.a("string");

      cy.intercept("DELETE", "/api/delete-product").as("deleteProduct");
      cy.request("DELETE", "/api/delete-product", {
        stripe_product_id: stripeProductId,
      }).then((response) => {
        expect(response.status).to.eq(200);
        const body =
          typeof response.body === "string"
            ? JSON.parse(response.body)
            : response.body;

        expect(body).to.have.property(
          "message",
          "Product deleted successfully",
        );
      });
    });
  });
});
