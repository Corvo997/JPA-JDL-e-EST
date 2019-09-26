package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.Consultorio5App;
import com.mycompany.myapp.domain.Pagamento;
import com.mycompany.myapp.repository.PagamentoRepository;
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

import com.mycompany.myapp.domain.enumeration.TipoPagamento;
/**
 * Integration tests for the {@link PagamentoResource} REST controller.
 */
@SpringBootTest(classes = Consultorio5App.class)
public class PagamentoResourceIT {

    private static final Double DEFAULT_VALOR = 1D;
    private static final Double UPDATED_VALOR = 2D;
    private static final Double SMALLER_VALOR = 1D - 1D;

    private static final TipoPagamento DEFAULT_TIPO_PAGAMENO = TipoPagamento.AVISTA;
    private static final TipoPagamento UPDATED_TIPO_PAGAMENO = TipoPagamento.PLANOSAUDE;

    @Autowired
    private PagamentoRepository pagamentoRepository;

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

    private MockMvc restPagamentoMockMvc;

    private Pagamento pagamento;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PagamentoResource pagamentoResource = new PagamentoResource(pagamentoRepository);
        this.restPagamentoMockMvc = MockMvcBuilders.standaloneSetup(pagamentoResource)
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
    public static Pagamento createEntity(EntityManager em) {
        Pagamento pagamento = new Pagamento()
            .valor(DEFAULT_VALOR)
            .tipoPagameno(DEFAULT_TIPO_PAGAMENO);
        return pagamento;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pagamento createUpdatedEntity(EntityManager em) {
        Pagamento pagamento = new Pagamento()
            .valor(UPDATED_VALOR)
            .tipoPagameno(UPDATED_TIPO_PAGAMENO);
        return pagamento;
    }

    @BeforeEach
    public void initTest() {
        pagamento = createEntity(em);
    }

    @Test
    @Transactional
    public void createPagamento() throws Exception {
        int databaseSizeBeforeCreate = pagamentoRepository.findAll().size();

        // Create the Pagamento
        restPagamentoMockMvc.perform(post("/api/pagamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pagamento)))
            .andExpect(status().isCreated());

        // Validate the Pagamento in the database
        List<Pagamento> pagamentoList = pagamentoRepository.findAll();
        assertThat(pagamentoList).hasSize(databaseSizeBeforeCreate + 1);
        Pagamento testPagamento = pagamentoList.get(pagamentoList.size() - 1);
        assertThat(testPagamento.getValor()).isEqualTo(DEFAULT_VALOR);
        assertThat(testPagamento.getTipoPagameno()).isEqualTo(DEFAULT_TIPO_PAGAMENO);
    }

    @Test
    @Transactional
    public void createPagamentoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pagamentoRepository.findAll().size();

        // Create the Pagamento with an existing ID
        pagamento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPagamentoMockMvc.perform(post("/api/pagamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pagamento)))
            .andExpect(status().isBadRequest());

        // Validate the Pagamento in the database
        List<Pagamento> pagamentoList = pagamentoRepository.findAll();
        assertThat(pagamentoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPagamentos() throws Exception {
        // Initialize the database
        pagamentoRepository.saveAndFlush(pagamento);

        // Get all the pagamentoList
        restPagamentoMockMvc.perform(get("/api/pagamentos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pagamento.getId().intValue())))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR.doubleValue())))
            .andExpect(jsonPath("$.[*].tipoPagameno").value(hasItem(DEFAULT_TIPO_PAGAMENO.toString())));
    }
    
    @Test
    @Transactional
    public void getPagamento() throws Exception {
        // Initialize the database
        pagamentoRepository.saveAndFlush(pagamento);

        // Get the pagamento
        restPagamentoMockMvc.perform(get("/api/pagamentos/{id}", pagamento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pagamento.getId().intValue()))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR.doubleValue()))
            .andExpect(jsonPath("$.tipoPagameno").value(DEFAULT_TIPO_PAGAMENO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPagamento() throws Exception {
        // Get the pagamento
        restPagamentoMockMvc.perform(get("/api/pagamentos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePagamento() throws Exception {
        // Initialize the database
        pagamentoRepository.saveAndFlush(pagamento);

        int databaseSizeBeforeUpdate = pagamentoRepository.findAll().size();

        // Update the pagamento
        Pagamento updatedPagamento = pagamentoRepository.findById(pagamento.getId()).get();
        // Disconnect from session so that the updates on updatedPagamento are not directly saved in db
        em.detach(updatedPagamento);
        updatedPagamento
            .valor(UPDATED_VALOR)
            .tipoPagameno(UPDATED_TIPO_PAGAMENO);

        restPagamentoMockMvc.perform(put("/api/pagamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPagamento)))
            .andExpect(status().isOk());

        // Validate the Pagamento in the database
        List<Pagamento> pagamentoList = pagamentoRepository.findAll();
        assertThat(pagamentoList).hasSize(databaseSizeBeforeUpdate);
        Pagamento testPagamento = pagamentoList.get(pagamentoList.size() - 1);
        assertThat(testPagamento.getValor()).isEqualTo(UPDATED_VALOR);
        assertThat(testPagamento.getTipoPagameno()).isEqualTo(UPDATED_TIPO_PAGAMENO);
    }

    @Test
    @Transactional
    public void updateNonExistingPagamento() throws Exception {
        int databaseSizeBeforeUpdate = pagamentoRepository.findAll().size();

        // Create the Pagamento

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPagamentoMockMvc.perform(put("/api/pagamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pagamento)))
            .andExpect(status().isBadRequest());

        // Validate the Pagamento in the database
        List<Pagamento> pagamentoList = pagamentoRepository.findAll();
        assertThat(pagamentoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePagamento() throws Exception {
        // Initialize the database
        pagamentoRepository.saveAndFlush(pagamento);

        int databaseSizeBeforeDelete = pagamentoRepository.findAll().size();

        // Delete the pagamento
        restPagamentoMockMvc.perform(delete("/api/pagamentos/{id}", pagamento.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Pagamento> pagamentoList = pagamentoRepository.findAll();
        assertThat(pagamentoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Pagamento.class);
        Pagamento pagamento1 = new Pagamento();
        pagamento1.setId(1L);
        Pagamento pagamento2 = new Pagamento();
        pagamento2.setId(pagamento1.getId());
        assertThat(pagamento1).isEqualTo(pagamento2);
        pagamento2.setId(2L);
        assertThat(pagamento1).isNotEqualTo(pagamento2);
        pagamento1.setId(null);
        assertThat(pagamento1).isNotEqualTo(pagamento2);
    }
}
