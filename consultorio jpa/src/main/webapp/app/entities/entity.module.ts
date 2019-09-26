import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'consultorio',
        loadChildren: () => import('./consultorio/consultorio.module').then(m => m.Consultorio5ConsultorioModule)
      },
      {
        path: 'pessoa',
        loadChildren: () => import('./pessoa/pessoa.module').then(m => m.Consultorio5PessoaModule)
      },
      {
        path: 'consulta',
        loadChildren: () => import('./consulta/consulta.module').then(m => m.Consultorio5ConsultaModule)
      },
      {
        path: 'funcionario',
        loadChildren: () => import('./funcionario/funcionario.module').then(m => m.Consultorio5FuncionarioModule)
      },
      {
        path: 'pagamento',
        loadChildren: () => import('./pagamento/pagamento.module').then(m => m.Consultorio5PagamentoModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class Consultorio5EntityModule {}
