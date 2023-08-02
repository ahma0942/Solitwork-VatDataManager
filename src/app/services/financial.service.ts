import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {

  constructor(private http:HttpClient) { }
  getFinancialTransactions(params?:any):Observable<any>{
    return this.http.get(environment.baseUrl+`/financialtransactions`,{params:params});
  }
  changeStatus(obj?:any):Observable<any>{
    console.log(obj)
    return this.http.post(environment.baseUrl+`/setisreportedvat` ,{} , {params:obj});
  }
}
