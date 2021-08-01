import { Component, OnInit } from '@angular/core';
import { UrlserviceService } from '../urlservice.service';   
import {Observable} from 'rxjs';    
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';    
import { Urldetail } from '../urldetail';

@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.css']
})
export class UrlComponent implements OnInit {    
  data :Urldetail[]; 
  UserForm: FormGroup;    
  massage:string; 
  SHOW:boolean = false; 
  child:any; 
  longurl:string='';
  shorturl:string =''; 
  constructor(private formbulider: FormBuilder,private loginService:UrlserviceService) {
    this.UserForm = this.formbulider.group({    
      longurl: ['', [Validators.required]]   
    }); 
    
   }    
   get form() { return this.UserForm.controls; }  
  ngOnInit() {  
     this.loginService.GetUrl().subscribe( (urls: Urldetail[])=> { 
       this.data = urls;
      });
    
  }    
  
  genurlnow(value)
  {
    if(this.shorturl.length>1 || !value.longurl)
    {
      return;
    }
    this.longurl = value.longurl;
    this.Showurl(this.longurl) ;
  }  
  
  getrandom() {
    var text = "https://";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
Showurl(url)
 {
  this.child = document.createElement('a');
  var link = document.createTextNode("This is link");
  this.child.appendChild(link);
  this.child.title = "This is Link";
  this.child.href = url;
  this.shorturl = this.getrandom();
  this.child.textContent = this.shorturl;
  document.getElementById('url').appendChild(this.child);
  this.UserForm.reset();
  this.SHOW = true;
}
onFormSubmit(value)    
{  
  if(!this.SHOW||this.shorturl.length<1)
  {
    return;
  }
  var existingdata = this.data.find(x=>x.urllong == this.longurl);
  console.log(existingdata);
  if(existingdata != null)
  {
    existingdata.count = existingdata.count+1;
    this.loginService.UpdateUrl(existingdata).subscribe( (urls: Urldetail[])=> { 
      this.data = urls;
      this.SHOW = false;
      document.getElementById('url').removeChild(this.child);
      this.child=null;
      this.shorturl = '';
      this.longurl ='';
     });
     return;
  }
  var requestobj = new Urldetail();
  requestobj.urllong = this.longurl;
  requestobj.urlshort = this.shorturl;
  requestobj.count = 1;
  this.loginService.CreateUrl(requestobj).subscribe( (urls: Urldetail[])=> { 
    this.data = urls;
    this.SHOW = false;
    document.getElementById('url').removeChild(this.child);
    this.child=null;
    this.shorturl = '';
    this.longurl ='';
   });
} 
}    