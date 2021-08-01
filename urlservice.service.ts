import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';  
import {HttpHeaders} from '@angular/common/http';  
import { from, Observable } from 'rxjs';  
import { Urldetail } from "../app/urldetail";

@Injectable({
  providedIn: 'root'
})
export class UrlserviceService{
  Url :string = 'https://localhost:44399/UrlShortner/GetallUrl';  
  urlpost:string = 'https://localhost:44399/UrlShortner/InsertUrl';
  urlupdate:string='https://localhost:44399/UrlShortner/UpdateUrl'
//  headerSettings: {[name: string]: string | string[]; } = {};  
// header : any= new HttpHeaders(this.headerSettings);
constructor(private http : HttpClient) {   
}  
public GetUrl(){ 

 return this.http.get<Urldetail[]>(this.Url,{withCredentials:true});  
} 
public CreateUrl(request:Urldetail){  

 return this.http.post<Urldetail[]>(this.urlpost,request,{withCredentials:true});  
} 
public UpdateUrl(request:Urldetail){  

  return this.http.post<Urldetail[]>(this.urlupdate,request,{withCredentials:true});  
 }
 
}  
