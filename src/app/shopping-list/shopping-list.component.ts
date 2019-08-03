import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingList } from '../shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients:Ingredient[]= [];
  private subscription:Subscription;

  constructor(private shoppingListService:ShoppingList) { }

  ngOnInit() {
    this.ingredients=this.shoppingListService.getIngredient();
    this.subscription=this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients:Ingredient[])=> this.ingredients=ingredients
    )
  }

  onEditItem(index:number){
    this.shoppingListService.startedEditing.next(index)
  }

  onDelete(){
    
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
