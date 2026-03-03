package com.autoflex.inventory.models;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Column;

@Entity
public class RawMaterial extends PanacheEntity {

    @Column(nullable = false, unique = true)
    public String code; // Código de identificação manual

    @Column(nullable = false)
    public String name;

    @Column(nullable = false)
    public Double quantity;
}