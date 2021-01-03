package com.example.toDoappServer.Entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.dom4j.rule.Mode;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.transaction.annotation.Transactional;


import java.io.Serializable;

import java.util.*;
import javax.persistence.*;

@Entity
@Table(name = "dateetodoapp")

public class ModelDate implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue
    private int id;

    @Column(name = "datename")
    private String datename;

    @ManyToOne(targetEntity = ModelAuth.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "name", referencedColumnName = "User_name")

    @JsonBackReference
    private ModelAuth auth;

    @OneToMany(mappedBy = "datee", fetch = FetchType.LAZY,cascade = CascadeType.ALL,orphanRemoval = true)

    @JsonManagedReference

    private List<ModelEntity> courses = new ArrayList<>();

    public ModelAuth getAuth() {
        return auth;
    }

    public void setAuth(ModelAuth auth) {
        this.auth = auth;
    }

    public int getId() {
        return id;
    }


    public String getDatename() {
        return datename;
    }

    public void setDatename(String datename) {
        this.datename = datename;
    }

    public List<ModelEntity> getCourses() {
        return courses;
    }

    public void setCourses(List<ModelEntity> courses) {
        this.courses = courses;
    }

    public void setId(int id) {
        this.id = id;
    }
}
