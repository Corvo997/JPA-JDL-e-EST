package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Consultorio;
import com.mycompany.myapp.repository.ConsultorioRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Consultorio}.
 */
@RestController
@RequestMapping("/api")
public class ConsultorioResource {

    private final Logger log = LoggerFactory.getLogger(ConsultorioResource.class);

    private static final String ENTITY_NAME = "consultorio";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ConsultorioRepository consultorioRepository;

    public ConsultorioResource(ConsultorioRepository consultorioRepository) {
        this.consultorioRepository = consultorioRepository;
    }

    /**
     * {@code POST  /consultorios} : Create a new consultorio.
     *
     * @param consultorio the consultorio to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new consultorio, or with status {@code 400 (Bad Request)} if the consultorio has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/consultorios")
    public ResponseEntity<Consultorio> createConsultorio(@RequestBody Consultorio consultorio) throws URISyntaxException {
        log.debug("REST request to save Consultorio : {}", consultorio);
        if (consultorio.getId() != null) {
            throw new BadRequestAlertException("A new consultorio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Consultorio result = consultorioRepository.save(consultorio);
        return ResponseEntity.created(new URI("/api/consultorios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /consultorios} : Updates an existing consultorio.
     *
     * @param consultorio the consultorio to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated consultorio,
     * or with status {@code 400 (Bad Request)} if the consultorio is not valid,
     * or with status {@code 500 (Internal Server Error)} if the consultorio couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/consultorios")
    public ResponseEntity<Consultorio> updateConsultorio(@RequestBody Consultorio consultorio) throws URISyntaxException {
        log.debug("REST request to update Consultorio : {}", consultorio);
        if (consultorio.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Consultorio result = consultorioRepository.save(consultorio);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, consultorio.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /consultorios} : get all the consultorios.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of consultorios in body.
     */
    @GetMapping("/consultorios")
    public List<Consultorio> getAllConsultorios() {
        log.debug("REST request to get all Consultorios");
        return consultorioRepository.findAll();
    }

    /**
     * {@code GET  /consultorios/:id} : get the "id" consultorio.
     *
     * @param id the id of the consultorio to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the consultorio, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/consultorios/{id}")
    public ResponseEntity<Consultorio> getConsultorio(@PathVariable Long id) {
        log.debug("REST request to get Consultorio : {}", id);
        Optional<Consultorio> consultorio = consultorioRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(consultorio);
    }

    /**
     * {@code DELETE  /consultorios/:id} : delete the "id" consultorio.
     *
     * @param id the id of the consultorio to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/consultorios/{id}")
    public ResponseEntity<Void> deleteConsultorio(@PathVariable Long id) {
        log.debug("REST request to delete Consultorio : {}", id);
        consultorioRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
