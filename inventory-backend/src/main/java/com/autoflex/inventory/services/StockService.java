package com.autoflex.inventory.services;

import com.autoflex.inventory.models.Product;
import com.autoflex.inventory.models.RawMaterial;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class StockService {

    @Transactional
    public void processProductSale(Product product, int quantitySold) {
        if (product.compositions == null) return;

        for (var comp : product.compositions) {
            RawMaterial rm = comp.rawMaterial;
            double totalNeeded = comp.quantityNeeded * quantitySold;

            if (rm.quantity < totalNeeded) {
                throw new RuntimeException("Estoque insuficiente de: " + rm.name);
            }

            rm.quantity -= totalNeeded;
            rm.persist(); 
        }
    }
}