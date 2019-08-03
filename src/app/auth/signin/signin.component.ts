import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService:AuthService,private router:Router,private route:ActivatedRoute)  { }

  ngOnInit() {
    this.authService.loggedChanged.
    subscribe(
      (response:boolean)=>{
        if(response){
          this.goToStart()
        }
      }
    )
  }

  onSignin(form:NgForm){
    this.authService.signinUser(form.value.email,form.value.password)
  }

  goToStart(){
    this.router.navigate(['/'],{relativeTo: this.route})
  }
}
