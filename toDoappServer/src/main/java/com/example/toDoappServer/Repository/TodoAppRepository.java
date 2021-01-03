package com.example.toDoappServer.Repository;

import com.example.toDoappServer.Entity.ModelDate;
import com.example.toDoappServer.Entity.ModelEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.io.Serializable;


@Repository
public interface TodoAppRepository extends JpaRepository<ModelEntity, Integer> {


}
