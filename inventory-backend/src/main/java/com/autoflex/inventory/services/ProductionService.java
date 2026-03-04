package com.autoflex.inventory.services;

import com.autoflex.inventory.models.Product;
import com.autoflex.inventory.models.ProductComposition;
import com.autoflex.inventory.models.RawMaterial;
import jakarta.enterprise.context.ApplicationScoped;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ApplicationScoped
public class ProductionService {

    public static class SuggestionDTO {
        public String productName;
        public int quantityPossible;
        public BigDecimal unitPrice;
        public BigDecimal totalValue;

        public SuggestionDTO(String name, int qty, BigDecimal price) {
            this.productName = name;
            this.quantityPossible = qty;
            this.unitPrice = price;
            this.totalValue = (price != null) ? price.multiply(BigDecimal.valueOf(qty)) : BigDecimal.ZERO;
        }
    }

    /**
     * Calculates production suggestions based on current stock.
     * Logic: Sorts by price descending to prioritize higher-value products (RF004).
     */
    public List<SuggestionDTO> getProductionSuggestion() {
        // Find products ordered by price descending per requirement RF004
        List<Product> products = Product.find("order by price desc").list();
        List<RawMaterial> allMaterials = RawMaterial.listAll();
        
        // Map to track available stock during calculation without hitting the DB repeatedly
        Map<String, Double> virtualStock = new HashMap<>();
        for (RawMaterial rm : allMaterials) {
            virtualStock.put(rm.code, rm.quantity != null ? rm.quantity : 0.0);
        }

        List<SuggestionDTO> suggestions = new ArrayList<>();

        for (Product product : products) {
            if (product.compositions == null || product.compositions.isEmpty()) continue;

            int qtyPossible = calculateMaxProduction(product, virtualStock);

            if (qtyPossible > 0) {
                suggestions.add(new SuggestionDTO(product.name, qtyPossible, product.price));

                // Deduct from virtual stock to avoid over-promising materials for the next products
                for (ProductComposition comp : product.compositions) {
                    double currentStock = virtualStock.get(comp.rawMaterial.code);
                    virtualStock.put(comp.rawMaterial.code, currentStock - (comp.quantityNeeded * qtyPossible));
                }
            }
        }
        return suggestions;
    }

    private int calculateMaxProduction(Product product, Map<String, Double> virtualStock) {
        int max = Integer.MAX_VALUE;
        for (ProductComposition comp : product.compositions) {
            if (comp.quantityNeeded == null || comp.quantityNeeded <= 0) continue;
            double available = virtualStock.getOrDefault(comp.rawMaterial.code, 0.0);
            int possible = (int) (available / comp.quantityNeeded);
            if (possible < max) max = possible;
        }
        return (max == Integer.MAX_VALUE) ? 0 : max;
    }
}