package com.autoflex.inventory.controllers;

import com.autoflex.inventory.models.Product;
import com.autoflex.inventory.services.StockService;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Path("/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductController {

    @Inject
    StockService stockService;

    // 1. CREATE - Agora usando o ProductRequest para limpar o Swagger
    @POST
    @Transactional
    public Response create(ProductRequest request) {
        if (request.code == null || request.name == null || request.price == null) {
            return Response.status(Response.Status.BAD_REQUEST)
                           .entity(Map.of("error", "Code, Name and Price are required")).build();
        }
        
        Product product = new Product();
        product.code = request.code;
        product.name = request.name;
        product.price = request.price;
        product.persist();
        
        return Response.status(Response.Status.CREATED).entity(product).build();
    }

    @GET
    public List<Product> getAll() {
        return Product.listAll();
    }

    @GET
    @Path("/{id}")
    public Response getById(@PathParam("id") Long id) {
        Product product = Product.findById(id);
        if (product == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(product).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response update(@PathParam("id") Long id, ProductRequest request) {
        Product entity = Product.findById(id);
        if (entity == null) {
            return Response.status(Response.Status.NOT_FOUND).entity(Map.of("error", "Product not found")).build();
        }
        entity.code = request.code;
        entity.name = request.name;
        entity.price = request.price;
        return Response.ok(entity).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        boolean deleted = Product.deleteById(id);
        return deleted ? Response.noContent().build() : Response.status(Response.Status.NOT_FOUND).build();
    }

    @POST
    @Path("/{id}/sell")
    @Transactional 
    public Response sellProduct(@PathParam("id") Long id, @QueryParam("quantity") int quantity) {
        Product product = Product.findById(id);
        if (product == null) {
            return Response.status(Response.Status.NOT_FOUND).entity(Map.of("error", "Product not found")).build();
        }
        try {
            stockService.processProductSale(product, quantity);
            return Response.ok(product).build();
        } catch (RuntimeException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(Map.of("error", e.getMessage())).build();
        }
    }

    // Classe DTO para limpar a interface do Swagger e facilitar o Front-end
    public static class ProductRequest {
        public String code;
        public String name;
        public BigDecimal price;
    }
}