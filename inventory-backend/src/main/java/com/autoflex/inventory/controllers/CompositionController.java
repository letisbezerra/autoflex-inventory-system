package com.autoflex.inventory.controllers;

import com.autoflex.inventory.models.Product;
import com.autoflex.inventory.models.ProductComposition;
import com.autoflex.inventory.models.RawMaterial;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.Map;

import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

@Path("/compositions")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Composition", description = "Endpoints for managing product compositions")
public class CompositionController {

    @POST
    @Transactional
    public Response associate(CompositionRequest request) {
        if (request.productId == null || request.rawMaterialId == null || request.quantityNeeded == null || request.quantityNeeded <= 0) {
            return Response.status(Response.Status.BAD_REQUEST)
                           .entity(Map.of("error", "All fields are required and quantity must be greater than zero")).build();
        }

        Product product = Product.findById(request.productId);
        RawMaterial material = RawMaterial.findById(request.rawMaterialId);

        if (product == null || material == null) {
            return Response.status(Response.Status.NOT_FOUND)
                           .entity(Map.of("error", "Product or Material not found")).build();
        }

        boolean alreadyExists = ProductComposition.find("product = ?1 and rawMaterial = ?2", product, material).count() > 0;
        if (alreadyExists) {
            return Response.status(Response.Status.CONFLICT)
                           .entity(Map.of("error", "This material is already associated with this product")).build();
        }

        ProductComposition composition = new ProductComposition();
        composition.product = product;
        composition.rawMaterial = material;
        composition.quantityNeeded = request.quantityNeeded;
        composition.persist();

        return Response.status(Response.Status.CREATED).entity(composition).build();
    }

    @Schema(name = "Composition Request", description = "Request body for associating a raw material with a product")
    public static class CompositionRequest {
        public Long productId;
        public Long rawMaterialId;
        public Double quantityNeeded;
    }
}