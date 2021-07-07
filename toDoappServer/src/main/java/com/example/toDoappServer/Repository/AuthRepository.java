package com.example.toDoappServer.Repository;

import com.example.toDoappServer.Entity.ModelAdmin;
import com.example.toDoappServer.Entity.ModelAuth;
import com.example.toDoappServer.Entity.ModelDate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuthRepository extends JpaRepository<ModelAuth, Integer> {
    @Query(
            "SELECT M FROM ModelAuth M"
    )
    public List<ModelAuth> findWithQuery();

    @Query(
            "SELECT M FROM ModelAuth M WHERE M.username=?1"
    )
    public ModelAuth findPassword(String username);

    @Query(
            "SELECT A.username,COUNT(A.username)as worksvalue FROM ModelEntity E,ModelDate D,ModelAuth A " +
                    "WHERE A.username=D.auth AND E.datee=D.datename " +
                    "GROUP BY A.username  "
    )
    public List<ModelAdmin> findIstatictic();


}
