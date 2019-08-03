import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable()
export class AuthService {
    loggedChanged= new Subject<boolean>();
    token:string;

    constructor(private router:Router){


    }
    signupUser(email:string,password:string){
        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email,password).
        catch(
            error=>console.log(error)
        )
    }

    signinUser(email:string,password:string){
        firebase.auth().signInWithEmailAndPassword(email,password).
        then(
            (response)=>{
                firebase.auth().currentUser.getIdToken().then(
                    (token:string)=>{
                        this.token=token
                        //this.loggedChanged.next(true)
                        this.router.navigate(['/'])
                    }
                )
            }
        ).
        catch(
            error=>{
                alert('Contrasenia incorrecta.')
            }
        )
    }

    getToken(){
        firebase.auth().currentUser.getIdToken().then(
            (token:string)=>{
                this.token=token
            }
        )
        return this.token;
        }

    isAuthenticated(){
        return this.token !=null;
    }

    logout(){
        firebase.auth().signOut();
        this.token=null;
    }
}


// Use getIdToken() instead of getToken()
// Sección 20, Clase 261
// Important note: If you're using Firebase 5.x or higher (you can check the package.json  file to find out), you should use getIdToken()  for obtaining the token, NOT getToken()  as shown in the next lectures.

// Also important: When I show you where to find the token in the browser, you'll NOT find it in localStorage anymore, instead, it'll now be stored in IndexedDB. That's the only thing that differs - the token usage will stay the same.