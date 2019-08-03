import { Component, OnInit } from '@angular/core';
import { User } from './shared/User';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loaderFeature:string='recipe';
  userData:User;

  
  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyAB6UfdTXw2-DaioU_yYgILWHcF8IObHMs",
      authDomain: "ng-recipe-book-1b795.firebaseapp.com",
      databaseURL: "https://ng-recipe-book-1b795.firebaseio.com",
      projectId: "ng-recipe-book-1b795",
      storageBucket: "ng-recipe-book-1b795.appspot.com",
      messagingSenderId: "688698288893"
    });
  }

  onNavigate(feature:string){
    this.loaderFeature=feature;
  }

   onUserDetails(user:User){
     this.userData=user;
     //console.log(this.userData)
   }


}
