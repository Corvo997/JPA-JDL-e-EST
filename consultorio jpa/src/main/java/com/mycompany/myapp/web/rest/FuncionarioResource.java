package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Funcionario;
import com.mycompany.myapp.repository.FuncionarioRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Funcionario}.
 */
@RestController
@RequestMapping("/api")
public class FuncionarioResource {

    private final Logger log = LoggerFactory.getLogger(FuncionarioResource.class);

    private static final String ENTITY_NAME = "funcionario";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FuncionarioRepository funcionarioRepository;

    public FuncionarioResource(FuncionarioRepository funcionarioRepository) {
        this.funcionarioRepository = funcionarioRepository;
    }

    /**
     * {@code POST  /funcionarios} : Create a new funcionario.
     *
     * @param funcionario the funcionario to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new funcionario, or with status {@code 400 (Bad Request)} if the funcionario has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/funcionarios")
    public ResponseEntity<Funcionario> createFuncionario(@RequestBody Funcionario funcionario) throws URISyntaxException {
        log.debug("REST request to save Funcionario : {}", funcionario);
        if (funcionario.getId() != null) {
            throw new BadRequestAlertException("A new funcionario cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Funcionario result = funcionarioRepository.save(funcionario);
        return ResponseEntity.created(new URI("/api/funcionarios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /funcionarios} : Updates an existing funcionario.
     *
     * @param funcionario the funcionario to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated funcionario,
     * or with status {@code 400 (Bad Request)} if the funcionario is not valid,
     * or with status {@code 500 (Internal Server Error)} if the funcionario couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/funcionarios")
    public ResponseEntity<Funcionario> updateFuncionario(@RequestBody Funcionario funcionario) throws URISyntaxException {
        log.debug("REST request to update Funcionario : {}", funcionario);
        if (funcionario.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Funcionario result = funcionarioRepository.save(funcionario);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, funcionario.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /funcionarios} : get all the funcionarios.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of funcionarios in body.
     */
    @GetMapping("/funcionarios")
    public List<Funcionario> getAllFuncionarios() {
        log.debug("REST request to get all Funcionarios");
        return funcionarioRepository.findAll();
    }

    /**
     * {@code GET  /funcionarios/:id} : get the "id" funcionario.
     *
     * @param id the id of the funcionario to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the funcionario, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/funcionarios/{id}")
    public ResponseEntity<Funcionario> getFuncionario(@PathVariable Long id) {
        log.debug("REST request to get Funcionario : {}", id);
        Optional<Funcionario> funcionario = funcionarioRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(funcionario);
    }

    /**
     * {@code DELETE  /funcionarios/:id} : delete the "id" funcionario.
     *
     * @param id the id of the funcionario to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/funcionarios/{id}")
    public ResponseEntity<Void> deleteFuncionario(@PathVariable Long id) {
        log.debug("REST request to delete Funcionario : {}", id);
        funcionarioRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
