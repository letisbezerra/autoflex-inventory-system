package com.autoflex.inventory.controllers;

import com.autoflex.inventory.models.Product;
import com.autoflex.inventory.models.ProductComposition;
import com.autoflex.inventory.models.RawMaterial;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/compositions")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CompositionController {

    @POST
    @Transactional
    public Response associate(CompositionRequest request) {
        Product product = Product.findById(request.productId);
        RawMaterial material = RawMaterial.findById(request.rawMaterialId);

        if (product == null || material == null) {
            return Response.status(Response.Status.NOT_FOUND)
                           .entity("Product or Material not found").build();
        }

        ProductComposition composition = new ProductComposition();
        composition.product = product;
        composition.rawMaterial = material;
        composition.quantityNeeded = request.quantityNeeded;
        composition.persist();

        return Response.status(Response.Status.CREATED).entity(composition).build();
    }

    // Esta classe cria o Schema limpo que você viu no Swagger
    public static class CompositionRequest {
        public Long productId;
        public Long rawMaterialId;
        public Double quantityNeeded;
    }
}