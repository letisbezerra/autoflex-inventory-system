package com.autoflex.inventory;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.notNullValue;

@QuarkusTest
public class ProductionResourceTest {

    @Test
    public void testProductionSuggestionEndpoint() {
        given()
          .when().get("/production/suggest")
          .then()
             .statusCode(200)
             .body("suggestions", notNullValue());
    }
}