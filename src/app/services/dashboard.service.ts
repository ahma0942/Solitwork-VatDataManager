import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getKpiData(params: any): Observable<any> {
    return this.http.get(environment.baseUrl + `/kpis`, { params: params });
  }
  getDetailOverview(params?: any): Observable<any> {
    return this.http.get(environment.baseUrl + `/vattransactions`, { params: params });
  }
  getDifferenceData(params?: any): Observable<any> {
    return this.http.get(environment.baseUrl + `/differences`, { params: params });
  }
  getSingleDifferenceData(verificationId?: any) {
    return this.http.get(environment.baseUrl + `/verifications/${verificationId}`, {});
  }
  deleteDifference(verificationId?:any): Observable<any> {
    return this.http.delete(environment.baseUrl + `/verifications/${verificationId}`, {});
  }
  updateDifferenceData(verificationId?: any, obj?: any) {
    return this.http.put(environment.baseUrl + `/verifications/${verificationId}`, {}, { params: obj });
  }
  updateFile(verificationId?: any, obj?: any) {
    var form = new FormData();
    form.set('file', obj);
    return this.http.post(environment.baseUrl + `/verifications/${verificationId}/files`, form);
  }
  deleteFile(verificationId?:any,fileId?:any){
    return this.http.delete(environment.baseUrl + `/verifications/${verificationId}/files/${fileId}`, {});
  }
}
