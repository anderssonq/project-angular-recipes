import { Injectable } from "@angular/core";
import { Recipe } from "./recipes/recipe.model";
import { Ingredient } from "./shared/ingredients.model";
import { ShoppingList } from "./shopping-list.service";
import { Subject } from "rxjs";


@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Jambalaya Recipe', 'Recipe with Andouille Sausage Shrimp and Chicken', 'https://www.gimmesomeoven.com/wp-content/uploads/2014/03/Cajun-Jambalaya-Recipe-with-Andouille-Sausage-Shrimp-and-Chicken-3-1.jpg',
      [new Ingredient('Tomatoes', 5)]),
    new Recipe('Crispy Falafel', 'How to make delicious and crispy falafel at home rivaling your favorite restaurants', 'https://www.inspiredtaste.net/wp-content/uploads/2019/07/Crispy-Falafel-Recipe-1200.jpg',
      [new Ingredient('Meat', 2), new Ingredient('Meat', 2), new Ingredient('Meat', 2)])
  ];

  constructor(private slService: ShoppingList) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice())

  }
  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id]
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.slService.AddIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice())
  }
}
