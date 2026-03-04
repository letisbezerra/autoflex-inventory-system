package com.autoflex.inventory.models;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.math.BigDecimal;
import java.util.List;

@Entity
public class Product extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore 
    public Long id;

    @Column(nullable = false, unique = true)
    public String code;

    @Column(nullable = false)
    public String name;

    @Column(nullable = false)
    public BigDecimal price;
    
    public Double quantity = 0.0;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    @JsonIgnore 
    public List<ProductComposition> compositions;
}