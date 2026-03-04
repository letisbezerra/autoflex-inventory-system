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

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

@Path("/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "2. Products", description = "Product management using business codes")
public class ProductController {

    @Inject
    StockService stockService;

    @POST
    @Transactional
    @Operation(summary = "Create product")
    public Response create(ProductRequest request) {
        if (request.code == null || request.name == null || request.price == null) {
            return Response.status(Response.Status.BAD_REQUEST)
                           .entity(Map.of("error", "Code, Name and Price are required")).build();
        }
        
        if (Product.find("code", request.code).firstResult() != null) {
            return Response.status(Response.Status.CONFLICT)
                           .entity(Map.of("error", "Product code already exists")).build();
        }

        Product product = new Product();
        product.code = request.code;
        product.name = request.name;
        product.price = request.price;
        product.persist();
        
        return Response.status(Response.Status.CREATED).entity(product).build();
    }

    @GET
    @Operation(summary = "List all products")
    public List<Product> getAll() {
        return Product.listAll();
    }

    @GET
    @Path("/{code}")
    @Operation(summary = "Get product by Code")
    public Response getByCode(
        @Parameter(description = "Business code", required = true)
        @PathParam("code") String code) {
        
        Product product = Product.find("code", code).firstResult();
        if (product == null) {
            return Response.status(Response.Status.NOT_FOUND)
                           .entity(Map.of("error", "Product not found")).build();
        }
        return Response.ok(product).build();
    }

    @PUT
    @Path("/{code}") 
    @Transactional
    @Operation(summary = "Update product")
    public Response update(@PathParam("code") String code, ProductRequest request) {
        Product entity = Product.find("code", code).firstResult();
        if (entity == null) {
            return Response.status(Response.Status.NOT_FOUND)
                           .entity(Map.of("error", "Product not found")).build();
        }

        entity.name = request.name;
        entity.price = request.price;
        return Response.ok(entity).build();
    }

    @DELETE
    @Path("/{code}")
    @Transactional
    @Operation(summary = "Delete product")
    public Response delete(@PathParam("code") String code) {
        Product entity = Product.find("code", code).firstResult();
        if (entity == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        entity.delete();
        return Response.noContent().build();
    }

    @POST
    @Path("/{code}/sell")
    @Transactional 
    @Operation(summary = "Register sale")
    public Response sellProduct(@PathParam("code") String code, @QueryParam("quantity") int quantity) {
        Product product = Product.find("code", code).firstResult();
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

    // AQUI ESTÁ A CLASSE QUE ESTAVA DANDO ERRO
    @Schema(name = "ProductRequest")
    public static class ProductRequest {
        @Schema(required = true, examples = {"PRD-001"})
        public String code;
        
        @Schema(required = true, examples = {"Professional Camera"})
        public String name;
        
        @Schema(required = true, examples = {"1500.00"})
        public BigDecimal price;
    }
}