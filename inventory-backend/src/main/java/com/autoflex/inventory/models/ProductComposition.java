package com.autoflex.inventory.models;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class ProductComposition extends PanacheEntity {

    @ManyToOne
    @JsonIgnore 
    public Product product;

    @ManyToOne
    public RawMaterial rawMaterial;

    public Double quantityNeeded;
}