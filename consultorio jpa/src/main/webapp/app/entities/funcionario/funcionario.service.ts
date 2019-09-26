import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFuncionario } from 'app/shared/model/funcionario.model';

type EntityResponseType = HttpResponse<IFuncionario>;
type EntityArrayResponseType = HttpResponse<IFuncionario[]>;

@Injectable({ providedIn: 'root' })
export class FuncionarioService {
  public resourceUrl = SERVER_API_URL + 'api/funcionarios';

  constructor(protected http: HttpClient) {}

  create(funcionario: IFuncionario): Observable<EntityResponseType> {
    return this.http.post<IFuncionario>(this.resourceUrl, funcionario, { observe: 'response' });
  }

  update(funcionario: IFuncionario): Observable<EntityResponseType> {
    return this.http.put<IFuncionario>(this.resourceUrl, funcionario, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFuncionario>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFuncionario[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
