package com.example.toDoappServer.Repository;

import com.example.toDoappServer.Entity.ModelDate;
import com.example.toDoappServer.Entity.ModelEntity;
import oracle.sql.NUMBER;
import org.hibernate.mapping.Array;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface DateRepository extends JpaRepository<ModelDate, Integer> {
    @Query(
            "SELECT M FROM  ModelEntity M WHERE M.datee.id=?1 "

    )
    List<ModelEntity> findAllData(int id);



}
