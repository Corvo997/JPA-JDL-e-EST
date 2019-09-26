package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Pessoa.
 */
@Entity
@Table(name = "pessoa")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Pessoa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "cpf")
    private Integer cpf;

    @Column(name = "sexo")
    private Boolean sexo;

    @ManyToMany(mappedBy = "pessoas")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Consulta> consultas = new HashSet<>();

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

    public Pessoa nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getCpf() {
        return cpf;
    }

    public Pessoa cpf(Integer cpf) {
        this.cpf = cpf;
        return this;
    }

    public void setCpf(Integer cpf) {
        this.cpf = cpf;
    }

    public Boolean isSexo() {
        return sexo;
    }

    public Pessoa sexo(Boolean sexo) {
        this.sexo = sexo;
        return this;
    }

    public void setSexo(Boolean sexo) {
        this.sexo = sexo;
    }

    public Set<Consulta> getConsultas() {
        return consultas;
    }

    public Pessoa consultas(Set<Consulta> consultas) {
        this.consultas = consultas;
        return this;
    }

    public Pessoa addConsulta(Consulta consulta) {
        this.consultas.add(consulta);
        consulta.getPessoas().add(this);
        return this;
    }

    public Pessoa removeConsulta(Consulta consulta) {
        this.consultas.remove(consulta);
        consulta.getPessoas().remove(this);
        return this;
    }

    public void setConsultas(Set<Consulta> consultas) {
        this.consultas = consultas;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Pessoa)) {
            return false;
        }
        return id != null && id.equals(((Pessoa) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Pessoa{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", cpf=" + getCpf() +
            ", sexo='" + isSexo() + "'" +
            "}";
    }
}
