package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.Consulta;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Consulta entity.
 */
@Repository
public interface ConsultaRepository extends JpaRepository<Consulta, Long> {

    @Query(value = "select distinct consulta from Consulta consulta left join fetch consulta.pessoas",
        countQuery = "select count(distinct consulta) from Consulta consulta")
    Page<Consulta> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct consulta from Consulta consulta left join fetch consulta.pessoas")
    List<Consulta> findAllWithEagerRelationships();

    @Query("select consulta from Consulta consulta left join fetch consulta.pessoas where consulta.id =:id")
    Optional<Consulta> findOneWithEagerRelationships(@Param("id") Long id);

}
