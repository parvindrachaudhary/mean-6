import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http' ;
import { JwtHelperService } from '@auth0/angular-jwt';



 const headers = new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': "token"
  });


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
 httpOptions;
 authToken;
 user;
 isExp;
 headers;



domain ="http://localhost:8080";


  constructor( private http: HttpClient,) { }


  

  registerUser(user){
  this.createHeader();

  return this.http.post(this.domain + '/authentication/register', user , this.headers ) ;
  }


   checkUsername(username){
  this.createHeader();

  return this.http.get(this.domain + '/authentication/checkUsername/' + username ) ;
  }


   checkEmail(email){

this.createHeader();
  return this.http.get(this.domain + '/authentication/checkEmail/' + email ,this.headers) ;
  }
 
login(user){
  this.createHeader();
  return this.http.post(this.domain + '/authentication/login', user );
}
logout(){
  this.authToken =null;
  this.user =null;
  localStorage.clear();
}

  storeUserData(token,user){
     localStorage.setItem('token',token);
     localStorage.setItem('user',JSON.stringify(user));
     this.authToken =token;
     this.user =user;
  }

createHeader(){
   this.loadToken();

 this.httpOptions ={
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': this.authToken
  })
};
}
  loadToken(){
    
    this.authToken =localStorage.getItem('token');
  }


 getProfile() {
    this.createHeader();
    
    return this.http.get(this.domain + "/authentication/profile", this.httpOptions);
  }


getPublicProfile(username){
  this.createHeader();
  return this.http.get(this.domain + '/authentication/publicProfile/'+ username, this.httpOptions);
}

 logedIn(): boolean{
const authToken =localStorage.getItem('token');
  
  const helper= new JwtHelperService();
  
 return !helper.isTokenExpired(authToken);
  
 
}

}
