package com.autoflex.inventory.models;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;

@Entity
public class RawMaterial extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    @JsonIgnore 
    public Long id;

    @Column(nullable = false, unique = true)
    public String code; 

    @Column(nullable = false)
    public String name;

    @Column(nullable = false)
    public Double quantity = 0.0;

    @OneToMany(mappedBy = "rawMaterial", cascade = CascadeType.ALL)
    @JsonIgnore
    public List<ProductComposition> compositions;
}