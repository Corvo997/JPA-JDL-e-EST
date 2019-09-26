package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.Pagamento;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Pagamento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PagamentoRepository extends JpaRepository<Pagamento, Long> {

}
