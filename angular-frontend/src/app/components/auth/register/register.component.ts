import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }
  onSubmit(registerForm:any){
    console.log(registerForm.value)
    this.authService.register(registerForm.value).subscribe((res:any)=>{

    })
  }
}
