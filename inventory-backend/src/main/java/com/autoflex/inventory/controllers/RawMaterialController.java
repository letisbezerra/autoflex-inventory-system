package com.autoflex.inventory.controllers;

import com.autoflex.inventory.models.RawMaterial;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;
import java.util.Map;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

@Path("/raw-materials")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "1. Raw Materials", description = "Management of raw materials using business codes")
public class RawMaterialController {

    @GET
    @Operation(summary = "List all materials")
    public List<RawMaterial> getAll() {
        return RawMaterial.listAll();
    }

    @POST
    @Transactional
    @Operation(summary = "Create material")
    public Response create(RawMaterialRequest request) {
        if (request.code == null || request.name == null || request.quantity == null) {
            return Response.status(Response.Status.BAD_REQUEST)
                           .entity(Map.of("error", "Code, Name and Quantity are required")).build();
        }

        if (RawMaterial.find("code", request.code).firstResult() != null) {
            return Response.status(Response.Status.CONFLICT)
                           .entity(Map.of("error", "Material code already exists")).build();
        }

        RawMaterial material = new RawMaterial();
        material.code = request.code;
        material.name = request.name;
        material.quantity = request.quantity;
        material.persist();

        return Response.status(Response.Status.CREATED).entity(material).build();
    }

    @PUT
    @Path("/{code}")
    @Transactional
    @Operation(summary = "Update material by Code")
    public Response update(
        @Parameter(description = "Business code", required = true)
        @PathParam("code") String code, 
        RawMaterialRequest request) {
        
        RawMaterial entity = RawMaterial.find("code", code).firstResult();
        if (entity == null) {
            return Response.status(Response.Status.NOT_FOUND).entity(Map.of("error", "Material not found")).build();
        }
        
        entity.name = request.name;
        entity.quantity = request.quantity;
        
        return Response.ok(entity).build();
    }

    @DELETE
    @Path("/{code}")
    @Transactional
    @Operation(summary = "Delete material by Code")
    public Response delete(@PathParam("code") String code) {
        RawMaterial entity = RawMaterial.find("code", code).firstResult();
        if (entity == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        entity.delete();
        return Response.noContent().build();
    }

    @Schema(name = "RawMaterialRequest")
    public static class RawMaterialRequest {
        @Schema(required = true, examples = {"RM-001"})
        public String code;
        @Schema(required = true, examples = {"Steel Plate"})
        public String name;
        @Schema(required = true, examples = {"100.0"})
        public Double quantity;
    }
}