import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IConsultorio } from 'app/shared/model/consultorio.model';

type EntityResponseType = HttpResponse<IConsultorio>;
type EntityArrayResponseType = HttpResponse<IConsultorio[]>;

@Injectable({ providedIn: 'root' })
export class ConsultorioService {
  public resourceUrl = SERVER_API_URL + 'api/consultorios';

  constructor(protected http: HttpClient) {}

  create(consultorio: IConsultorio): Observable<EntityResponseType> {
    return this.http.post<IConsultorio>(this.resourceUrl, consultorio, { observe: 'response' });
  }

  update(consultorio: IConsultorio): Observable<EntityResponseType> {
    return this.http.put<IConsultorio>(this.resourceUrl, consultorio, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IConsultorio>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IConsultorio[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
