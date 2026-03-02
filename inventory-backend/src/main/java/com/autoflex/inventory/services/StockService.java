package com.autoflex.inventory.services;

import com.autoflex.inventory.models.Product;
import com.autoflex.inventory.models.RawMaterial;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class StockService {

    @Transactional
    public void processProductSale(Product product, int quantitySold) {
        // Acessamos 'compositions' direto, sem o 'get'
        if (product.compositions == null || product.compositions.isEmpty()) {
            throw new RuntimeException("Product has no composition defined.");
        }

        for (var comp : product.compositions) {
            RawMaterial rm = comp.rawMaterial;
            double totalNeeded = comp.quantityNeeded * quantitySold;

            if (rm.quantity < totalNeeded) {
                throw new RuntimeException("Insufficient stock for: " + rm.name);
            }

            // Atualiza o valor e persiste
            rm.quantity -= totalNeeded;
            rm.persist();
        }
    }
}