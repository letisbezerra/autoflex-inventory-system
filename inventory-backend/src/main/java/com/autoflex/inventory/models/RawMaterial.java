
package com.autoflex.inventory.models;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;

@Entity
public class RawMaterial extends PanacheEntity {
    public String name;
    public Double stockQuantity; // RNF007: Quantidade em estoque em inglês
}