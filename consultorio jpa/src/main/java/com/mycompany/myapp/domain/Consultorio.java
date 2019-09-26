package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Consultorio.
 */
@Entity
@Table(name = "consultorio")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Consultorio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @ManyToOne
    @JsonIgnoreProperties("consultorios")
    private Consulta consultas;

    @ManyToOne
    @JsonIgnoreProperties("consultorios")
    private Funcionario funcionario;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Consultorio nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Consulta getConsultas() {
        return consultas;
    }

    public Consultorio consultas(Consulta consulta) {
        this.consultas = consulta;
        return this;
    }

    public void setConsultas(Consulta consulta) {
        this.consultas = consulta;
    }

    public Funcionario getFuncionario() {
        return funcionario;
    }

    public Consultorio funcionario(Funcionario funcionario) {
        this.funcionario = funcionario;
        return this;
    }

    public void setFuncionario(Funcionario funcionario) {
        this.funcionario = funcionario;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Consultorio)) {
            return false;
        }
        return id != null && id.equals(((Consultorio) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Consultorio{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
