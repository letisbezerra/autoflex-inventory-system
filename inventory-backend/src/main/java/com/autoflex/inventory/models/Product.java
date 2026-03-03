package com.autoflex.inventory.models;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Column;
import java.math.BigDecimal;
import java.util.List;

@Entity
public class Product extends PanacheEntity {
    
    @Column(nullable = false, unique = true)
    public String code; // Código de identificação manual

    @Column(nullable = false)
    public String name;

    @Column(nullable = false)
    public BigDecimal price;

    public Double quantity; // Quantidade em estoque do produto final

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    public List<ProductComposition> compositions;
}