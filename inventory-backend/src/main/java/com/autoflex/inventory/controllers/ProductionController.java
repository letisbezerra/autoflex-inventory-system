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

@Path("/production")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductionController {

    @Inject
    ProductionService productionService;

    @GET
    @Path("/suggest")
    public Map<String, Object> getProductionDashboard() {
        List<SuggestionDTO> suggestions = productionService.getProductionSuggestion();

        BigDecimal grandTotal = suggestions.stream()
                .map(s -> s.totalValue)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, Object> response = new HashMap<>();
        response.put("suggestions", suggestions);
        response.put("grandTotalProductionValue", grandTotal);
        response.put("message", "Priority based on highest product value");

        return response;
    }
}