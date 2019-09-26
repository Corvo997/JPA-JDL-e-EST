package com.mycompany.myapp.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.mycompany.myapp.domain.enumeration.TipoPagamento;

/**
 * A Pagamento.
 */
@Entity
@Table(name = "pagamento")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Pagamento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "valor")
    private Double valor;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_pagameno")
    private TipoPagamento tipoPagameno;

    @OneToMany(mappedBy = "pagamento")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Consulta> consultas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getValor() {
        return valor;
    }

    public Pagamento valor(Double valor) {
        this.valor = valor;
        return this;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public TipoPagamento getTipoPagameno() {
        return tipoPagameno;
    }

    public Pagamento tipoPagameno(TipoPagamento tipoPagameno) {
        this.tipoPagameno = tipoPagameno;
        return this;
    }

    public void setTipoPagameno(TipoPagamento tipoPagameno) {
        this.tipoPagameno = tipoPagameno;
    }

    public Set<Consulta> getConsultas() {
        return consultas;
    }

    public Pagamento consultas(Set<Consulta> consultas) {
        this.consultas = consultas;
        return this;
    }

    public Pagamento addConsulta(Consulta consulta) {
        this.consultas.add(consulta);
        consulta.setPagamento(this);
        return this;
    }

    public Pagamento removeConsulta(Consulta consulta) {
        this.consultas.remove(consulta);
        consulta.setPagamento(null);
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
        if (!(o instanceof Pagamento)) {
            return false;
        }
        return id != null && id.equals(((Pagamento) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Pagamento{" +
            "id=" + getId() +
            ", valor=" + getValor() +
            ", tipoPagameno='" + getTipoPagameno() + "'" +
            "}";
    }
}
