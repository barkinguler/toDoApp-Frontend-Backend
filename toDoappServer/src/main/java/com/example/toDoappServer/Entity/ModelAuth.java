package com.example.toDoappServer.Entity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.dom4j.rule.Mode;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.transaction.annotation.Transactional;


import java.io.Serializable;

import java.util.*;
import javax.persistence.*;
@Entity
@Table(name = "authtodoapp")
public class ModelAuth implements Serializable{
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue
    private int id;

    @Column(name = "password")
    private String password;

    @Column(name = "User_name")
    private String username;

    @OneToMany( mappedBy = "auth",fetch = FetchType.LAZY,cascade = CascadeType.ALL,orphanRemoval = true)


    private List<ModelDate> Dates = new ArrayList<>();



    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<ModelDate> getDates() {
        return Dates;
    }



    public void setDates(List<ModelDate> dates) {
        Dates = dates;
    }

}
