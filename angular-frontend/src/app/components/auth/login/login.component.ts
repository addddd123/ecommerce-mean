import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
type loginModel = { email: string, passowrd: string }
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loading = false;
  display = 'none';
  email: String = '';
  error='hidden'
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  openModal() {
    this.display = 'block'
  }
  onCloseHandled() {
    this.display = 'none'
  }
  onSubmit(loginModel: any) {
    this.loading = true;
    this.authService.login(loginModel.value).subscribe((res: any) => {
      this.loading = false
    },
      (err: any) => {
        this.loading = false
        alert(err.error.message)

      })
  }
  forgotPassword() {
    this.authService.forgotPassword(this.email).subscribe((res: any) => {

    },
    (err:any)=>{
      this.error='unset'
    })
  }

}
