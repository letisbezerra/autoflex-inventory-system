package com.autoflex.inventory.controllers;

import com.autoflex.inventory.models.Product;
import com.autoflex.inventory.services.StockService; 
import jakarta.inject.Inject; 
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductController {

    @Inject
    StockService stockService; 

    @POST
    @Transactional
    public Response create(Product product) {
        if (product.name == null || product.price == null) {
            return Response.status(Response.Status.BAD_REQUEST)
                           .entity("Name and Price are required").build();
        }
        product.persist();
        return Response.status(Response.Status.CREATED).entity(product).build();
    }

    @GET
    public List<Product> getAll() {
        return Product.listAll();
    }

    @POST
    @Path("/{id}/sell")
    @Transactional 
    public Response sellProduct(@PathParam("id") Long id, @QueryParam("quantity") int quantity) {
        Product product = Product.findById(id);
        
        if (product == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("Product not found").build();
        }

        try {
            stockService.processProductSale(product, quantity);
            return Response.ok(product).build();
        } catch (RuntimeException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        }
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void delete(@PathParam("id") Long id) {
        Product.deleteById(id);
    }
}