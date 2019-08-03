import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {

  recipe:Recipe;
  id:number;
  constructor(private recipeService:RecipeService,
    private route:ActivatedRoute, private router:Router) { }
 
  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params)=>{
        this.id=+params['id'];
        this.recipe= this.recipeService.getRecipe(this.id)
      }
    )
  }

  onAddToShopping(){
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredients)
  }

  onEdit(){
    // this.router.navigate(['edit'], {relativeTo: this.route}) es lo mismo q
    this.router.navigate(['../', this.id,'edit'], {relativeTo: this.route})
  }

  onDeleteItem(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'],{relativeTo:this.route})
  }
 
}
