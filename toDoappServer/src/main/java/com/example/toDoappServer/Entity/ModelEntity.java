package com.example.toDoappServer.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.DynamicUpdate;


import javax.persistence.*;
import java.io.Serializable;


@Entity
@Table(name = "employeestodoapp")

public class ModelEntity implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue
    private int id;

    @Column(name = "workname")
    private String workname;

    @Column(name = "done")
    private boolean done;


    @ManyToOne(targetEntity = ModelDate.class, fetch = FetchType.EAGER)

    @JoinColumn(name = "datee1", referencedColumnName = "datename")
    @JsonBackReference
    private ModelDate datee;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getWorkname() {
        return workname;
    }

    public void setWorkname(String workname) {
        this.workname = workname;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        System.out.print(done);
        this.done = done;
    }

    public ModelDate getDatee() {

        return datee;
    }

    public void setDatee(ModelDate datee) {

        this.datee = datee;
    }

}
