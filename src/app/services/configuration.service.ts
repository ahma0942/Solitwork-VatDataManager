import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private http:HttpClient) { }
  getAccountConfigurations(params?:any):Observable<any>{
    return this.http.get(environment.baseUrl+`/config/accounts`,{params:params});
  }
  getSingleAccount(params?:any):Observable<any>{
    return this.http.get(environment.baseUrl+`/config/account`,{params:params});
  }
  createAccount(accountData:any):Observable<any>{
    return this.http.post(environment.baseUrl+`/config/account`,accountData);
  }
  updateAccount(accountId:any,accountData:any):Observable<any>{
    debugger
    return this.http.put(environment.baseUrl+`/config/account`,accountData,{params:{account_id:accountId}});
  }



  getCountriesConfiguration(params?:any):Observable<any>{
    return this.http.get(environment.baseUrl+`/config/countries`,{params:params});
  }
  getSingleCountry(params?:any):Observable<any>{
    return this.http.get(environment.baseUrl+`/config/country`,{params:params});
  }
  createCountry(countryData:any):Observable<any>{
    return this.http.post(environment.baseUrl+`/config/country`,countryData);
  }
  updateCountry(legalEntity:any,countryData:any):Observable<any>{
    debugger
    return this.http.put(environment.baseUrl+`/config/country`,countryData,{params:{legalEntity:legalEntity}});
  }



  getDeliveryJournal(params?:any):Observable<any>{
    return this.http.get(environment.baseUrl+`/config/journalcategories`,{params:params});
  }
  getSingleJournal(params?:any):Observable<any>{
    return this.http.get(environment.baseUrl+`/config/journalCategory`,{params:params});
  }
  createJournal(countryData:any):Observable<any>{
    return this.http.post(environment.baseUrl+`/config/journalCategory`,countryData);
  }
  updateJournal(legalEntity:any,journalData:any):Observable<any>{
    debugger
    return this.http.put(environment.baseUrl+`/config/journalCategory`,journalData,{params:{legalEntity:legalEntity}});
  }

  getPostingType(params?:any):Observable<any>{
    return this.http.get(environment.baseUrl+`/config/postingtypes`,{params:params});
  }
  getSinglePostingType(params?:any):Observable<any>{
    return this.http.get(environment.baseUrl+`/config/postingtype`,{params:params});
  }
  createPostingType(countryData:any):Observable<any>{
    return this.http.post(environment.baseUrl+`/config/postingtype`,countryData);
  }
  updatePostingType(postingtype:any,postingTypeData:any):Observable<any>{
    debugger
    return this.http.put(environment.baseUrl+`/config/postingtype`,postingTypeData,{params:{postingtype_id:postingtype}});
  }


  getVatRates(params?:any):Observable<any>{
    return this.http.get(environment.baseUrl+`/config/vatrates`,{params:params});
  }
  getSingleVatRate(params?:any):Observable<any>{
    return this.http.get(environment.baseUrl+`/config/vatrate`,{params:params});
  }
  createVateRate(countryData:any):Observable<any>{
    return this.http.post(environment.baseUrl+`/config/vatrate`,countryData);
  }
  updateVarRate(postingtype:any,postingTypeData:any):Observable<any>{
    debugger
    return this.http.put(environment.baseUrl+`/config/vatrate`,postingTypeData,{params:{vatrate_id:postingtype}});
  }
}
