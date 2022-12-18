import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverURL=environment.serverURL;
  constructor(private http:HttpClient){}

  register(registerForm: any) {
    return this.http.post(this.serverURL+'auth/register',registerForm,httpOptions)
  }

  login(loginModel: any) {

    return this.http.post(this.serverURL+'auth/login',loginModel,httpOptions)
  }
  forgotPassword(email: String) {
    console.log(email)
    return this.http.post(this.serverURL+'auth/forgot-password',{email:email})
  }

}
