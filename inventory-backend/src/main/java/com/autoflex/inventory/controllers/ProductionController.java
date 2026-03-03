package com.autoflex.inventory.controllers;

import com.autoflex.inventory.services.ProductionService;
import com.autoflex.inventory.services.ProductionService.SuggestionDTO;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// Novos imports para o Swagger
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

@Path("/production")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "3. Production Planning", description = "Smart dashboard for production suggestions")
public class ProductionController {

    @Inject
    ProductionService productionService;

    @GET
    @Path("/suggest")
    @Operation(summary = "Get production dashboard", description = "Returns a prioritized list of products to produce based on current stock.")
    @APIResponse(
        responseCode = "200",
        description = "Production suggestion data",
        content = @Content(
            mediaType = "application/json",
            schema = @Schema(name = "Production Dashboard", description = "Financial and production summary")
        )
    )
    public Map<String, Object> getProductionDashboard() {
        List<SuggestionDTO> suggestions = productionService.getProductionSuggestion();

        BigDecimal grandTotal = suggestions.stream()
                .map(s -> s.totalValue)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, Object> response = new HashMap<>();
        response.put("suggestions", suggestions);
        response.put("grandTotalProductionValue", grandTotal);
        
        if (suggestions.isEmpty()) {
            response.put("message", "Insufficient raw materials to produce any products.");
        } else {
            response.put("message", "Priority based on highest product value.");
        }

        return response;
    }
}