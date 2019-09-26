import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IConsulta } from 'app/shared/model/consulta.model';

type EntityResponseType = HttpResponse<IConsulta>;
type EntityArrayResponseType = HttpResponse<IConsulta[]>;

@Injectable({ providedIn: 'root' })
export class ConsultaService {
  public resourceUrl = SERVER_API_URL + 'api/consultas';

  constructor(protected http: HttpClient) {}

  create(consulta: IConsulta): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(consulta);
    return this.http
      .post<IConsulta>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(consulta: IConsulta): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(consulta);
    return this.http
      .put<IConsulta>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IConsulta>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IConsulta[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(consulta: IConsulta): IConsulta {
    const copy: IConsulta = Object.assign({}, consulta, {
      dataConsulta: consulta.dataConsulta != null && consulta.dataConsulta.isValid() ? consulta.dataConsulta.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataConsulta = res.body.dataConsulta != null ? moment(res.body.dataConsulta) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((consulta: IConsulta) => {
        consulta.dataConsulta = consulta.dataConsulta != null ? moment(consulta.dataConsulta) : null;
      });
    }
    return res;
  }
}
