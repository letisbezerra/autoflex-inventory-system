package com.autoflex.inventory.models;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class ProductComposition extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    @JsonIgnore
    public Long id;

    @ManyToOne
    @JsonIgnore 
    public Product product;

    @ManyToOne
    public RawMaterial rawMaterial;

    @Column(nullable = false)
    public Double quantityNeeded;
}