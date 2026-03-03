package com.autoflex.inventory.controllers;

import com.autoflex.inventory.models.RawMaterial;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

@Path("/raw-materials")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Raw Materials", description = "Endpoints for managing raw materials in the inventory")
public class RawMaterialController {

    @GET
    public List<RawMaterial> getAll() {
        return RawMaterial.listAll();
    }

    @POST
    @Transactional
    public Response create(RawMaterial material) {
        if (material.code == null || material.name == null || material.quantity == null) {
            return Response.status(Response.Status.BAD_REQUEST)
                           .entity("Code, Name and Quantity are required").build();
        }
        material.persist();
        return Response.status(Response.Status.CREATED).entity(material).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response update(@PathParam("id") Long id, RawMaterial material) {
        RawMaterial entity = RawMaterial.findById(id);
        if (entity == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("Material not found").build();
        }
        entity.code = material.code; 
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

    @Schema(name = "Raw Material Input", description = "Data required to create or update a raw material")
    public static class RawMaterialRequest {
        public String code;
        public String name;
        public String unit;
    }
}