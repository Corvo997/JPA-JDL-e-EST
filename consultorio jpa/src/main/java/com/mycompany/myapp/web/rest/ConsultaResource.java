package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Consulta;
import com.mycompany.myapp.repository.ConsultaRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Consulta}.
 */
@RestController
@RequestMapping("/api")
public class ConsultaResource {

    private final Logger log = LoggerFactory.getLogger(ConsultaResource.class);

    private static final String ENTITY_NAME = "consulta";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ConsultaRepository consultaRepository;

    public ConsultaResource(ConsultaRepository consultaRepository) {
        this.consultaRepository = consultaRepository;
    }

    /**
     * {@code POST  /consultas} : Create a new consulta.
     *
     * @param consulta the consulta to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new consulta, or with status {@code 400 (Bad Request)} if the consulta has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/consultas")
    public ResponseEntity<Consulta> createConsulta(@RequestBody Consulta consulta) throws URISyntaxException {
        log.debug("REST request to save Consulta : {}", consulta);
        if (consulta.getId() != null) {
            throw new BadRequestAlertException("A new consulta cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Consulta result = consultaRepository.save(consulta);
        return ResponseEntity.created(new URI("/api/consultas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /consultas} : Updates an existing consulta.
     *
     * @param consulta the consulta to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated consulta,
     * or with status {@code 400 (Bad Request)} if the consulta is not valid,
     * or with status {@code 500 (Internal Server Error)} if the consulta couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/consultas")
    public ResponseEntity<Consulta> updateConsulta(@RequestBody Consulta consulta) throws URISyntaxException {
        log.debug("REST request to update Consulta : {}", consulta);
        if (consulta.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Consulta result = consultaRepository.save(consulta);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, consulta.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /consultas} : get all the consultas.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of consultas in body.
     */
    @GetMapping("/consultas")
    public List<Consulta> getAllConsultas(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Consultas");
        return consultaRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /consultas/:id} : get the "id" consulta.
     *
     * @param id the id of the consulta to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the consulta, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/consultas/{id}")
    public ResponseEntity<Consulta> getConsulta(@PathVariable Long id) {
        log.debug("REST request to get Consulta : {}", id);
        Optional<Consulta> consulta = consultaRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(consulta);
    }

    /**
     * {@code DELETE  /consultas/:id} : delete the "id" consulta.
     *
     * @param id the id of the consulta to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/consultas/{id}")
    public ResponseEntity<Void> deleteConsulta(@PathVariable Long id) {
        log.debug("REST request to delete Consulta : {}", id);
        consultaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
