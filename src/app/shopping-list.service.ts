import { Ingredient } from "./shared/ingredients.model";
import { Subject } from "rxjs";


export class ShoppingList {

   ingredientsChanged = new Subject<Ingredient[]>();
   startedEditing = new Subject<number>();


   private ingredients: Ingredient[] = [
      new Ingredient('Apples', 5),
      new Ingredient('Tomatoes', 15)
   ];

   getIngredient() {
      return this.ingredients.slice();
   }

   getIngredientt(index: number) {
      return this.ingredients[index];
   }

   AddIngredient(ingredientSolo: Ingredient) {
      this.ingredients.push(ingredientSolo);
      this.ingredientsChanged.next(this.ingredients.slice())
   }

   AddIngredients(ingredients: Ingredient[]) {
      // for (const ingredient of ingredients) {
      //     this.AddIngredient(ingredient);
      // }
      this.ingredients.push(...ingredients);
      console.log(...ingredients);

      this.ingredientsChanged.next(this.ingredients.slice());
   }

   updateIngredients(index: number, newIngredient: Ingredient) {
      this.ingredients[index] = newIngredient;
      this.ingredientsChanged.next(this.ingredients.slice());
      console.log(this.ingredients.slice());

   }

   deleteIngredient(index: number) {
      this.ingredients.splice(index, 1);
      this.ingredientsChanged.next(this.ingredients.slice());
   }

}