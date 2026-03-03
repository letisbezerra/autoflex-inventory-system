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

    public List<SuggestionDTO> getProductionSuggestion() {
        // Ordenação por preço decrescente conforme RF004
        List<Product> products = Product.find("order by price desc").list();
        
        List<RawMaterial> allMaterials = RawMaterial.listAll();
        Map<Long, Double> virtualStock = new HashMap<>();
        for (RawMaterial rm : allMaterials) {
            virtualStock.put(rm.id, rm.quantity);
        }

        List<SuggestionDTO> suggestions = new ArrayList<>();

        for (Product product : products) {
            // Se o produto não tem composição, ele não pode ser produzido
            if (product.compositions == null || product.compositions.isEmpty()) continue;

            int count = 0;
            boolean canProduceMore = true;

            while (canProduceMore) {
                for (ProductComposition comp : product.compositions) {
                    // Proteção contra divisões por zero ou dados inconsistentes
                    if (comp.quantityNeeded == null || comp.quantityNeeded <= 0) {
                        canProduceMore = false;
                        break;
                    }

                    double currentStock = virtualStock.getOrDefault(comp.rawMaterial.id, 0.0);
                    if (currentStock < comp.quantityNeeded) {
                        canProduceMore = false;
                        break;
                    }
                }

                if (canProduceMore) {
                    for (ProductComposition comp : product.compositions) {
                        double currentStock = virtualStock.get(comp.rawMaterial.id);
                        virtualStock.put(comp.rawMaterial.id, currentStock - comp.quantityNeeded);
                    }
                    count++;
                }
                
                // Trava de segurança para evitar loops infinitos em lógica complexa
                if (count > 10000) break; 
            }

            if (count > 0) {
                suggestions.add(new SuggestionDTO(product.name, count, product.price));
            }
        }

        return suggestions;
    }
}