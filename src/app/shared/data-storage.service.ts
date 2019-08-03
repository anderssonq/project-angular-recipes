import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http'
import { RecipeService } from '../recipe.service';
import { map } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) { }

    storeRecipes() {
        const tk = this.authService.getToken(); // usar el token para los permisos necesarios
        const headers = new HttpHeaders().set('Authorization', 'Hehe');

        // return this.httpClient.put('https://ng-recipe-book-1b795.firebaseio.com/recipes.json',this.recipeService.getRecipes(),{
        //     observe:'body',
        //     params: new HttpParams().set('auth',tk)
        //     //headers: headers
        // })

        const req = new HttpRequest('PUT',
            'https://ng-recipe-book-1b795.firebaseio.com/recipes.json',
            this.recipeService.getRecipes(), {
                reportProgress: true,
                params: new HttpParams().set('auth', tk)
            })

        return this.httpClient.request(req);
    }

    // getRecipes(){
    //     return this.http.get('https://ng-recipe-book-1b795.firebaseio.com/recipes.json').
    //     subscribe(
    //         (response:Response)=>{
    //             const recipes:Recipe[]=response.json();     
    //             this.recipeService.setRecipes(recipes);
    //         }
    //     )
    // }
    getRecipes() {
        const tk = this.authService.getToken();

        //this.httpClient.get<Recipe[]>('https://ng-recipe-book-1b795.firebaseio.com/recipes.json?auth='+tk).pipe(
        this.httpClient.get<Recipe[]>('https://ng-recipe-book-1b795.firebaseio.com/recipes.json?auth=' + tk,
            {
                observe: 'body',
                responseType: 'json'
            }).pipe(
                map(
                    (recipes) => {
                        for (let recipe of recipes) {
                            if (!recipe['ingredients']) {
                                console.log(recipe);
                                recipe['ingredients'] = [];
                            }
                        }
                        return recipes;
                    }
                )
            ).subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
            )
    }

    getRecipesA() {
        return this.httpClient.get('https://ng-recipe-book-1b795.firebaseio.com/recipes.json').pipe(
            map((response: Response) => {
                return response.json()
            })
        )
    }
}