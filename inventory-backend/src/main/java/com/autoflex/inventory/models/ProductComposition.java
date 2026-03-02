package com.autoflex.inventory.models;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;

@Entity
public class ProductComposition extends PanacheEntity {
    
    @ManyToOne
    public Product product;
    
    @ManyToOne
    public RawMaterial rawMaterial;
    
    public Double quantityNeeded; // Quantidade necessária para produzir 1 unidade
}