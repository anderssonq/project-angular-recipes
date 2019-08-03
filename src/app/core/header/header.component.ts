import {Component, EventEmitter, Output, Input } from '@angular/core'
import { User } from '../../shared/User';
import { DataStorageService } from '../../shared/data-storage.service';
import { Recipe } from '../../recipes/recipe.model';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls:[]
})
export class HeaderComponent{

    @Output() featureSelected = new EventEmitter<string>();
    @Input() user:User;

    constructor(private dataStorageService:DataStorageService,
        private authService:AuthService){}

    onSelect(feature:string){
        this.featureSelected.emit(feature);
    }

    onSaveData(){
        this.dataStorageService.storeRecipes().
        subscribe(
            (response)=>{
                console.log(response);
            }
        )
    }
    onGetData(){
        this.dataStorageService.getRecipes()
    }

    //forma por el pipe
    onGetDataA(){
        this.dataStorageService.getRecipesA().
        subscribe(
            (recipes)=>{
                console.log(recipes);
            }
        )
    }

    onLogOut(){
        this.authService.logout()
    }

    isAuthenticated() {
        return this.authService.isAuthenticated();
    }
}