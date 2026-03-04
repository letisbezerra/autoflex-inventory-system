package com.autoflex.inventory.controllers;

import com.autoflex.inventory.models.Product;
import com.autoflex.inventory.models.ProductComposition;
import com.autoflex.inventory.models.RawMaterial;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.Map;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

@Path("/compositions")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "3. Composition", description = "Link products to raw materials using business codes")
public class CompositionController {

    @POST
    @Transactional
    @Operation(summary = "Associate material to product", description = "Links a raw material to a product using their business codes.")
    public Response associate(CompositionRequest request) {
        if (request.productCode == null || request.materialCode == null || request.quantityNeeded == null) {
            return Response.status(Response.Status.BAD_REQUEST)
                           .entity(Map.of("error", "ProductCode, MaterialCode and Quantity are required")).build();
        }

        Product product = Product.find("code", request.productCode).firstResult();
        RawMaterial material = RawMaterial.find("code", request.materialCode).firstResult();

        if (product == null || material == null) {
            return Response.status(Response.Status.NOT_FOUND)
                           .entity(Map.of("error", "Product or Material not found")).build();
        }

        ProductComposition composition = new ProductComposition();
        composition.product = product;
        composition.rawMaterial = material;
        composition.quantityNeeded = request.quantityNeeded;
        composition.persist();

        return Response.status(Response.Status.CREATED).entity(composition).build();
    }

    @Schema(name = "Composition Request")
    public static class CompositionRequest {
        @Schema(required = true, examples = {"PRD-001"})
        public String productCode;
        @Schema(required = true, examples = {"RM-001"})
        public String materialCode;
        @Schema(required = true, examples = {"2.5"})
        public Double quantityNeeded;
    }
}