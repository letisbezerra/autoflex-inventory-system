package com.autoflex.inventory.models;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType; 
import java.math.BigDecimal;
import java.util.List; 

@Entity
public class Product extends PanacheEntity {
    public String name;
    public BigDecimal price;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    public List<ProductComposition> compositions;    
}