package com.autoflex.inventory.controllers;

import com.autoflex.inventory.models.RawMaterial;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
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
}