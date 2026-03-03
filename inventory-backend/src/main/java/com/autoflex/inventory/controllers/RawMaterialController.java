package com.autoflex.inventory.controllers;

import com.autoflex.inventory.models.RawMaterial;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/raw-materials")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RawMaterialController {

    @GET
    public List<RawMaterial> getAll() {
        return RawMaterial.listAll();
    }

    @POST
    @Transactional
    public RawMaterial create(RawMaterial material) {
        material.persist();
        return material;
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response update(@PathParam("id") Long id, RawMaterial material) {
        RawMaterial entity = RawMaterial.findById(id);
        if (entity == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("Material not found").build();
        }
        entity.name = material.name;
        entity.quantity = material.quantity;
        return Response.ok(entity).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void delete(@PathParam("id") Long id) {
        RawMaterial.deleteById(id);
    }
    
}