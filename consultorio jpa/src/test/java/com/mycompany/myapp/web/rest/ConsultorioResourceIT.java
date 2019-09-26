package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.Consultorio5App;
import com.mycompany.myapp.domain.Consultorio;
import com.mycompany.myapp.repository.ConsultorioRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ConsultorioResource} REST controller.
 */
@SpringBootTest(classes = Consultorio5App.class)
public class ConsultorioResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private ConsultorioRepository consultorioRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restConsultorioMockMvc;

    private Consultorio consultorio;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ConsultorioResource consultorioResource = new ConsultorioResource(consultorioRepository);
        this.restConsultorioMockMvc = MockMvcBuilders.standaloneSetup(consultorioResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Consultorio createEntity(EntityManager em) {
        Consultorio consultorio = new Consultorio()
            .nome(DEFAULT_NOME);
        return consultorio;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Consultorio createUpdatedEntity(EntityManager em) {
        Consultorio consultorio = new Consultorio()
            .nome(UPDATED_NOME);
        return consultorio;
    }

    @BeforeEach
    public void initTest() {
        consultorio = createEntity(em);
    }

    @Test
    @Transactional
    public void createConsultorio() throws Exception {
        int databaseSizeBeforeCreate = consultorioRepository.findAll().size();

        // Create the Consultorio
        restConsultorioMockMvc.perform(post("/api/consultorios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(consultorio)))
            .andExpect(status().isCreated());

        // Validate the Consultorio in the database
        List<Consultorio> consultorioList = consultorioRepository.findAll();
        assertThat(consultorioList).hasSize(databaseSizeBeforeCreate + 1);
        Consultorio testConsultorio = consultorioList.get(consultorioList.size() - 1);
        assertThat(testConsultorio.getNome()).isEqualTo(DEFAULT_NOME);
    }

    @Test
    @Transactional
    public void createConsultorioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = consultorioRepository.findAll().size();

        // Create the Consultorio with an existing ID
        consultorio.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restConsultorioMockMvc.perform(post("/api/consultorios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(consultorio)))
            .andExpect(status().isBadRequest());

        // Validate the Consultorio in the database
        List<Consultorio> consultorioList = consultorioRepository.findAll();
        assertThat(consultorioList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllConsultorios() throws Exception {
        // Initialize the database
        consultorioRepository.saveAndFlush(consultorio);

        // Get all the consultorioList
        restConsultorioMockMvc.perform(get("/api/consultorios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(consultorio.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())));
    }
    
    @Test
    @Transactional
    public void getConsultorio() throws Exception {
        // Initialize the database
        consultorioRepository.saveAndFlush(consultorio);

        // Get the consultorio
        restConsultorioMockMvc.perform(get("/api/consultorios/{id}", consultorio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(consultorio.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingConsultorio() throws Exception {
        // Get the consultorio
        restConsultorioMockMvc.perform(get("/api/consultorios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateConsultorio() throws Exception {
        // Initialize the database
        consultorioRepository.saveAndFlush(consultorio);

        int databaseSizeBeforeUpdate = consultorioRepository.findAll().size();

        // Update the consultorio
        Consultorio updatedConsultorio = consultorioRepository.findById(consultorio.getId()).get();
        // Disconnect from session so that the updates on updatedConsultorio are not directly saved in db
        em.detach(updatedConsultorio);
        updatedConsultorio
            .nome(UPDATED_NOME);

        restConsultorioMockMvc.perform(put("/api/consultorios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedConsultorio)))
            .andExpect(status().isOk());

        // Validate the Consultorio in the database
        List<Consultorio> consultorioList = consultorioRepository.findAll();
        assertThat(consultorioList).hasSize(databaseSizeBeforeUpdate);
        Consultorio testConsultorio = consultorioList.get(consultorioList.size() - 1);
        assertThat(testConsultorio.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    public void updateNonExistingConsultorio() throws Exception {
        int databaseSizeBeforeUpdate = consultorioRepository.findAll().size();

        // Create the Consultorio

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConsultorioMockMvc.perform(put("/api/consultorios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(consultorio)))
            .andExpect(status().isBadRequest());

        // Validate the Consultorio in the database
        List<Consultorio> consultorioList = consultorioRepository.findAll();
        assertThat(consultorioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteConsultorio() throws Exception {
        // Initialize the database
        consultorioRepository.saveAndFlush(consultorio);

        int databaseSizeBeforeDelete = consultorioRepository.findAll().size();

        // Delete the consultorio
        restConsultorioMockMvc.perform(delete("/api/consultorios/{id}", consultorio.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Consultorio> consultorioList = consultorioRepository.findAll();
        assertThat(consultorioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Consultorio.class);
        Consultorio consultorio1 = new Consultorio();
        consultorio1.setId(1L);
        Consultorio consultorio2 = new Consultorio();
        consultorio2.setId(consultorio1.getId());
        assertThat(consultorio1).isEqualTo(consultorio2);
        consultorio2.setId(2L);
        assertThat(consultorio1).isNotEqualTo(consultorio2);
        consultorio1.setId(null);
        assertThat(consultorio1).isNotEqualTo(consultorio2);
    }
}
