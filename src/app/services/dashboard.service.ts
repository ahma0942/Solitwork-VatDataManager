import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  getKpiData(params:any):Observable<any>{
    return this.http.get(environment.baseUrl+`/kpis`,{params:params});
  }
  getDetailOverview(params?:any):Observable<any>{
    return this.http.get(environment.baseUrl+`/vattransactions`,{params:params});
  }
  getDifferenceData(params?:any):Observable<any>{
    return this.http.get(environment.baseUrl+`/differences`,{params:params});
  }
}
