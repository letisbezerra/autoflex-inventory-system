package com.autoflex.inventory.models;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import java.math.BigDecimal;

@Entity
public class Product extends PanacheEntity {
    public String name;
    public BigDecimal price; // Usamos BigDecimal para valores monetários (boa prática!)
}