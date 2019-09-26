package com.mycompany.myapp.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Funcionario.
 */
@Entity
@Table(name = "funcionario")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Funcionario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_registro")
    private Integer numeroRegistro;

    @Column(name = "nome")
    private String nome;

    @Column(name = "salario")
    private Double salario;

    @OneToMany(mappedBy = "funcionario")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Consultorio> consultorios = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumeroRegistro() {
        return numeroRegistro;
    }

    public Funcionario numeroRegistro(Integer numeroRegistro) {
        this.numeroRegistro = numeroRegistro;
        return this;
    }

    public void setNumeroRegistro(Integer numeroRegistro) {
        this.numeroRegistro = numeroRegistro;
    }

    public String getNome() {
        return nome;
    }

    public Funcionario nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Double getSalario() {
        return salario;
    }

    public Funcionario salario(Double salario) {
        this.salario = salario;
        return this;
    }

    public void setSalario(Double salario) {
        this.salario = salario;
    }

    public Set<Consultorio> getConsultorios() {
        return consultorios;
    }

    public Funcionario consultorios(Set<Consultorio> consultorios) {
        this.consultorios = consultorios;
        return this;
    }

    public Funcionario addConsultorio(Consultorio consultorio) {
        this.consultorios.add(consultorio);
        consultorio.setFuncionario(this);
        return this;
    }

    public Funcionario removeConsultorio(Consultorio consultorio) {
        this.consultorios.remove(consultorio);
        consultorio.setFuncionario(null);
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
        if (!(o instanceof Funcionario)) {
            return false;
        }
        return id != null && id.equals(((Funcionario) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Funcionario{" +
            "id=" + getId() +
            ", numeroRegistro=" + getNumeroRegistro() +
            ", nome='" + getNome() + "'" +
            ", salario=" + getSalario() +
            "}";
    }
}
