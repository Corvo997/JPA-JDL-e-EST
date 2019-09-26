package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

import com.mycompany.myapp.domain.enumeration.TipoProcedimento;

/**
 * A Consulta.
 */
@Entity
@Table(name = "consulta")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Consulta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_consulta")
    private ZonedDateTime dataConsulta;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_procedimento")
    private TipoProcedimento tipoProcedimento;

    @ManyToOne
    @JsonIgnoreProperties("consultas")
    private Pagamento pagamento;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "consulta_pessoa",
               joinColumns = @JoinColumn(name = "consulta_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "pessoa_id", referencedColumnName = "id"))
    private Set<Pessoa> pessoas = new HashSet<>();

    @OneToMany(mappedBy = "consultas")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Consultorio> consultorios = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDataConsulta() {
        return dataConsulta;
    }

    public Consulta dataConsulta(ZonedDateTime dataConsulta) {
        this.dataConsulta = dataConsulta;
        return this;
    }

    public void setDataConsulta(ZonedDateTime dataConsulta) {
        this.dataConsulta = dataConsulta;
    }

    public TipoProcedimento getTipoProcedimento() {
        return tipoProcedimento;
    }

    public Consulta tipoProcedimento(TipoProcedimento tipoProcedimento) {
        this.tipoProcedimento = tipoProcedimento;
        return this;
    }

    public void setTipoProcedimento(TipoProcedimento tipoProcedimento) {
        this.tipoProcedimento = tipoProcedimento;
    }

    public Pagamento getPagamento() {
        return pagamento;
    }

    public Consulta pagamento(Pagamento pagamento) {
        this.pagamento = pagamento;
        return this;
    }

    public void setPagamento(Pagamento pagamento) {
        this.pagamento = pagamento;
    }

    public Set<Pessoa> getPessoas() {
        return pessoas;
    }

    public Consulta pessoas(Set<Pessoa> pessoas) {
        this.pessoas = pessoas;
        return this;
    }

    public Consulta addPessoa(Pessoa pessoa) {
        this.pessoas.add(pessoa);
        pessoa.getConsultas().add(this);
        return this;
    }

    public Consulta removePessoa(Pessoa pessoa) {
        this.pessoas.remove(pessoa);
        pessoa.getConsultas().remove(this);
        return this;
    }

    public void setPessoas(Set<Pessoa> pessoas) {
        this.pessoas = pessoas;
    }

    public Set<Consultorio> getConsultorios() {
        return consultorios;
    }

    public Consulta consultorios(Set<Consultorio> consultorios) {
        this.consultorios = consultorios;
        return this;
    }

    public Consulta addConsultorio(Consultorio consultorio) {
        this.consultorios.add(consultorio);
        consultorio.setConsultas(this);
        return this;
    }

    public Consulta removeConsultorio(Consultorio consultorio) {
        this.consultorios.remove(consultorio);
        consultorio.setConsultas(null);
        return this;
    }

    public void setConsultorios(Set<Consultorio> consultorios) {
        this.consultorios = consultorios;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Consulta)) {
            return false;
        }
        return id != null && id.equals(((Consulta) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Consulta{" +
            "id=" + getId() +
            ", dataConsulta='" + getDataConsulta() + "'" +
            ", tipoProcedimento='" + getTipoProcedimento() + "'" +
            "}";
    }
}
