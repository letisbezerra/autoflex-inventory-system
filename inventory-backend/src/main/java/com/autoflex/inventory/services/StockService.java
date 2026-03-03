package com.autoflex.inventory.services;

import com.autoflex.inventory.models.Product;
import com.autoflex.inventory.models.ProductComposition;
import com.autoflex.inventory.models.RawMaterial;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class StockService {

    @Transactional
    public void processProductSale(Product product, int quantitySold) {
        if (quantitySold <= 0) {
            throw new RuntimeException("Quantity must be greater than zero.");
        }

        if (product.compositions != null && !product.compositions.isEmpty()) {
            for (ProductComposition comp : product.compositions) {
                RawMaterial rm = comp.rawMaterial;
                
                double totalNeeded = comp.quantityNeeded * quantitySold;

                if (rm.quantity < totalNeeded) {
                    throw new RuntimeException("Insufficient stock for material: " + rm.name + 
                        " (Needed: " + totalNeeded + ", Available: " + rm.quantity + ")");
                }

                rm.quantity -= totalNeeded;
                rm.persist(); 
            }
        }

        double currentQty = product.quantity != null ? product.quantity : 0.0;
        product.quantity = currentQty - quantitySold;
        
        product.persist();
    }
}